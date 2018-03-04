import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contract';
import * as baseContract from '../../../src/package/base-contract';
import * as test from '../../testnet-config';
import * as accounts from '../../accounts';
import { abi, data } from '../../abi';

describe('base-contract', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    const provider = ganache.provider(test.options);
    web3Provisioned.web3.setProvider(provider);
    const undeployedContract = new web3Provisioned.web3.eth.Contract(abi, { data });
    const contract = await undeployedContract.deploy().send(test.deploymentOptions);
    deployedContract.contract = contract;
  });

  describe('calls', () => {
    it('initial round should be 1', async () => {
      const expected = 1;
      const output = await baseContract.getRound();
      expect(output).toBe(expected);
    });

    it('initial jackpot should be 0', async () => {
      const expected = 0;
      const output = await baseContract.getJackpot();
      expect(output).toBe(expected);
    });

    it('initial price should be 250000000000000', async () => {
      const expected = 250000000000000;
      const output = await baseContract.getPrice();
      expect(output).toBe(expected);
    });

    it('initial isParticipant should be false', async () => {
      const expected = false;
      const output = await baseContract.getParticipation(accounts.owner.address);
      expect(output).toBe(expected);
    });
  });

  describe('transactions', () => {
    describe('requires user to be participant', () => {
      beforeEach(async () => {
        const isParticipant = await baseContract.getParticipation(accounts.user.address);
        if (!isParticipant) {
          const expected = '0x01';
          const price = await baseContract.getPrice();
          const { status } = await baseContract.pay(accounts.user.address, price);
          expect(status).toBe(expected);
        }
      });

      it('upload score should succeed if participant', async () => {
        const expected = '0x01';
        const score = 1;
        const messageHash = '0xa2b3fa66f50925b9648e1f4a0ab934a76c2d5d99f0fbdf5e7293b153a08516b2';
        const v = '0x1c';
        const r = '0x2aaf6d6b8e6084b4b8220b81501da9565661d84dfc85474827d2aeaf47af1428';
        const s = '0x29669f85961770eb3d9ad36e7808ebf3cd616ad717bfb642f805f053a820f3d2';
        const { status } = await baseContract
          .uploadScore(messageHash, v, r, s, accounts.user.address, score);
        expect(status).toBe(expected);
      });
    });
  });

  afterAll('shutdown', (done) => {
    const provider = web3Provisioned.web3._provider; // eslint-disable-line no-underscore-dangle
    web3Provisioned.web3.setProvider();
    provider.close(done);
  });
});
