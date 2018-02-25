import Web3 from 'web3/packages/web3';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contract';
import * as api from '../../../src/package/base-api';
import * as accounts from '../../accounts';
import sendIOU from '../sendIOU';

jest.setTimeout(500000);

describe('deployed contract', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    const infuraToken = process.env.INFURA_ACCESS_TOKEN;
    const providerURL = `https://rinkeby.infura.io/${infuraToken}`;
    const provider = new Web3.providers.HttpProvider(providerURL);
    web3Provisioned.web3.setProvider(provider);
    deployedContract.contract.setProvider(web3Provisioned.web3.currentProvider);

    await sendIOU();
  });

  it('move signer should be contract owner', async () => {
    const contractOwner = await deployedContract.contract.methods.owner().call();
    const direction = 1;
    const { signature } = await api.move(accounts.user.address, direction);
    const preFixed = true;
    const webserverSigner = await web3Provisioned
      .web3.eth.accounts.recover(signature.messageHash, signature.signature, preFixed);
    expect(webserverSigner).toBe(contractOwner);
  });
});
