import Web3 from 'web3';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contract';
import * as api from '../../../src/package/base-api';
import * as test from '../../unit/package/test-setup/test-provider';

describe('deployed contract', () => {
  beforeAll(() => {
    web3Provisioned.web3 = new Web3();
    const infuraToken = process.env.INFURA_ACCESS_TOKEN;
    const providerURL = `https://rinkeby.infura.io/${infuraToken}`;
    const provider = new Web3.providers.HttpProvider(providerURL);
    web3Provisioned.web3.setProvider(provider);
    deployedContract.contract.setProvider(web3Provisioned.web3.currentProvider);
  });

  it('move signer should be envvar', async () => {
    const ownerPrivateKey = process.env.ARCADE_PRIVATE_KEY;
    const owner = web3Provisioned.web3.eth.accounts.privateKeyToAccount(ownerPrivateKey);
    const direction = 1;
    const { signature } = await api.move(test.user.address, direction);
    const webserverSigner = await web3Provisioned
      .web3.eth.accounts.recover(signature.messageHash, signature.signature);
    expect(webserverSigner).toBe(owner.address);
  });

  it('price signer should be envvar', async () => {
    const ownerPrivateKey = process.env.ARCADE_PRIVATE_KEY;
    const owner = web3Provisioned.web3.eth.accounts.privateKeyToAccount(ownerPrivateKey);
    const { signature } = await api.price(test.user.address);
    const webserverSigner = await web3Provisioned
      .web3.eth.accounts.recover(signature.messageHash, signature.signature);
    expect(webserverSigner).toBe(owner.address);
  });
});
