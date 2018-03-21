import Web3 from 'web3/packages/web3';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contracts';
import addressJson from '../../../integration-tests-json/constants/address.json';
import abiJson from '../../../integration-tests-json/constants/abi.json';

describe('deployed contract', () => {
  beforeAll(() => {
    web3Provisioned.web3 = new Web3();
    const infuraToken = process.env.INFURA_ACCESS_TOKEN;
    const providerURL = `https://rinkeby.infura.io/${infuraToken}`;
    const provider = new Web3.providers.HttpProvider(providerURL);
    web3Provisioned.web3.setProvider(provider);
    deployedContract.accountContract.setProvider(web3Provisioned.web3.currentProvider);
  });

  it('should have correct address', async () => {
    expect(deployedContract.accountContract._address).toBe(deployedContract.accountAddress); // eslint-disable-line no-underscore-dangle, max-len
  });

  it('should have code', async () => {
    const contractCode = await web3Provisioned
      .web3.eth.getCode(deployedContract.accountContract._address); // eslint-disable-line no-underscore-dangle, max-len
    expect(contractCode).not.toBe('0x0');
  });

  it('should have an address equal to integration-json data', async () => {
    expect(addressJson.account).toEqual(deployedContract.accountAddress);
  });

  it('should have an abi equal to integration-json data', async () => {
    expect(abiJson.account).toEqual(JSON.parse(deployedContract.accountABIString));
  });

  it('should have owner equal to integration-json data', async () => {
    const contractOwner = await deployedContract.accountContract.methods.owner().call();
    const ownerAddress = addressJson.owner;
    expect(contractOwner).toBe(ownerAddress);
  });

  it('should have a price == 0.001 ETH', async () => {
    const price = await deployedContract.accountContract.methods.price().call().then(parseInt);
    expect(price).toBe(1000000000000000);
  });

  it('should have a timeout == oneWeek', async () => {
    const oneWeek = await deployedContract.accountContract.methods.oneWeek().call().then(parseInt);
    expect(oneWeek).toBe(60 * 60 * 24 * 7);
  });

  afterAll('shutdown', (done) => {
    const provider = web3Provisioned.web3._provider; // eslint-disable-line no-underscore-dangle
    web3Provisioned.web3.setProvider();
    provider.close(done);
  });
});
