import Web3 from 'web3';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contract';
import * as api from '../../../src/package/base-api';
import * as test from '../../unit/package/test-setup/test-provider';

jest.setTimeout(500000);

describe('deployed contract', () => {
  beforeAll(() => {
    web3Provisioned.web3 = new Web3();
    const infuraToken = process.env.INFURA_ACCESS_TOKEN;
    const providerURL = `https://rinkeby.infura.io/${infuraToken}`;
    const provider = new Web3.providers.HttpProvider(providerURL);
    web3Provisioned.web3.setProvider(provider);
    deployedContract.contract.setProvider(web3Provisioned.web3.currentProvider);
  });

  it('move signer should be contract owner', async () => {
    const contractOwner = await deployedContract.contract.methods.owner().call();
    const direction = 1;
    const { signature } = await api.move(test.user.address, direction);
    const webserverSigner = await web3Provisioned
      .web3.eth.accounts.recover(signature.messageHash, signature.signature);
    expect(webserverSigner).toBe(contractOwner);
  });

  it('price signer should be contract owner', async () => {
    const contractOwner = await deployedContract.contract.methods.owner().call();
    const { signature } = await api.price(test.user.address);
    const webserverSigner = await web3Provisioned
      .web3.eth.accounts.recover(signature.messageHash, signature.signature);
    expect(webserverSigner).toBe(contractOwner);
  });

  it('price', async () => {
    const rinkebyUserPrivateKey = process.env.RINKEBY_USER;
    const user = web3Provisioned.web3.eth.accounts.privateKeyToAccount(rinkebyUserPrivateKey);
    const { signature, price } = await api.price(user.address);
    const data = await deployedContract.contract.methods.adjustPrice(
      signature.messageHash,
      signature.v,
      signature.r,
      signature.s,
      user.address,
      price,
    ).encodeABI();
    const nonce = await web3Provisioned.web3.eth.getTransactionCount(user.address, 'pending');
    const value = 0;
    const to = deployedContract.contract._address; // eslint-disable-line no-underscore-dangle
    const { gas, gasPrice } = web3Provisioned;
    const chainId = web3Provisioned.network;
    const rawTx = {
      chainId, nonce, gas, gasPrice, to, value, data,
    };
    const signed = await user.signTransaction(rawTx);
    const { status } = await web3Provisioned.web3.eth.sendSignedTransaction(signed.rawTransaction);
    expect(status).toBe('0x1');
  });
});
