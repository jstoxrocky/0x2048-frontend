import Web3 from 'web3';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contract';

describe('deployed contract', () => {
  beforeAll(() => {
    web3Provisioned.web3 = new Web3();
    const infuraToken = process.env.INFURA_ACCESS_TOKEN;
    const providerURL = `https://rinkeby.infura.io/${infuraToken}`;
    const provider = new Web3.providers.HttpProvider(providerURL);
    web3Provisioned.web3.setProvider(provider);
    deployedContract.contract.setProvider(web3Provisioned.web3.currentProvider);
  });

  it('should have code', async () => {
    const contractCode = await web3Provisioned
      .web3.eth.getCode(deployedContract.contract._address); // eslint-disable-line no-underscore-dangle, max-len
    expect(contractCode).not.toBe('0x0');
  });

  it('owner should be real owner', async () => {
    const contractOwner = await deployedContract.contract.methods.owner().call();
    const ownerPrivateKey = process.env.ARCADE_PRIVATE_KEY;
    const owner = web3Provisioned.web3.eth.accounts.privateKeyToAccount(ownerPrivateKey);
    expect(contractOwner).toBe(owner.address);
  });
});
