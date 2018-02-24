import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as api from '../../../src/package/base-api';
import * as accounts from '../../accounts';
import sendIOU from '../sendIOU';

describe('deployed contract', async () => {
  beforeAll(async () => {
    await sendIOU();
  });

  it('move signer should be envvar', async () => {
    const ownerPrivateKey = process.env.PRIVATE_KEY_0x2048;
    const owner = web3Provisioned.web3.eth.accounts.privateKeyToAccount(ownerPrivateKey);
    const direction = 1;
    const { signature } = await api.move(accounts.user.address, direction);
    const preFixed = true;
    const webserverSigner = await web3Provisioned
      .web3.eth.accounts.recover(signature.messageHash, signature.signature, preFixed);
    expect(webserverSigner).toBe(owner.address);
  });
});
