import Web3 from 'web3';
import sinon from 'sinon';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contracts';
import addressJson from '../../../integration-json-fixtures/constants/address.json';
import abiJson from '../../../integration-json-fixtures/constants/abi.json';

let web3stub;

describe('json fixtures', () => {
  beforeAll(() => {
    web3stub = sinon.stub(web3Provisioned, 'web3').value(new Web3());
    const infuraToken = process.env.INFURA_ACCESS_TOKEN;
    const providerURL = `https://rinkeby.infura.io/${infuraToken}`;
    const provider = new Web3.providers.HttpProvider(providerURL);
    web3Provisioned.web3.setProvider(provider);
    deployedContract.arcadeContract.setProvider(web3Provisioned.web3.currentProvider);
  });

  it('should have an address equal to integration-json data', async () => {
    expect(addressJson.arcade).toEqual(deployedContract.arcadeAddress);
  });

  it('should have an abi equal to integration-json data', async () => {
    expect(abiJson.arcade).toEqual(JSON.parse(deployedContract.arcadeABIString));
  });

  it('should have a LIVE owner at rinkeby network equal to integration-json data', async () => {
    const contractOwner = await deployedContract.arcadeContract.methods.owner().call();
    const ownerAddress = addressJson.owner;
    expect(contractOwner).toBe(ownerAddress);
  });

  it('should have code at LIVE rinkeby network', async () => {
    const contractCode = await web3Provisioned
      .web3.eth.getCode(deployedContract.arcadeContract.options.address);
    expect(contractCode).not.toBe('0x0');
  });

  afterAll(() => {
    web3stub.restore();
  });
});
