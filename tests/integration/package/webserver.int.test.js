import Web3 from 'web3/packages/web3';
import merge from 'lodash/merge';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contract';
import * as api from '../../../src/package/base-api';
import * as test from '../../unit/package/test-setup/test-provider';

describe('deployed contract', async () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    const infuraToken = process.env.INFURA_ACCESS_TOKEN;
    const providerURL = `https://rinkeby.infura.io/${infuraToken}`;
    const provider = new Web3.providers.HttpProvider(providerURL);
    web3Provisioned.web3.setProvider(provider);
    deployedContract.contract.setProvider(web3Provisioned.web3.currentProvider);

    // IOU
    const value = 100;
    const msg = Web3.utils.soliditySha3(
      { type: 'address', value: deployedContract.accountAddress },
      { type: 'address', value: test.user.address },
      { type: 'uint256', value },
    );
    const signature = web3Provisioned.web3.eth.accounts.sign(msg, test.user.privateKey);
    const { v } = signature;
    const signed = merge(
      {},
      { signature: merge({}, signature, { v: Web3.utils.hexToNumber(v) }) },
      { user: test.user.address, value },
    );
    const data = await api.iou(signed);
    const { success } = data;
    expect(success).toBe(true);
  });

  it('move signer should be envvar', async () => {
    const ownerPrivateKey = process.env.PRIVATE_KEY_0x2048;
    const owner = web3Provisioned.web3.eth.accounts.privateKeyToAccount(ownerPrivateKey);
    const direction = 1;
    const { signature } = await api.move(test.user.address, direction);
    const preFixed = true;
    const webserverSigner = await web3Provisioned
      .web3.eth.accounts.recover(signature.messageHash, signature.signature, preFixed);
    expect(webserverSigner).toBe(owner.address);
  });
});
