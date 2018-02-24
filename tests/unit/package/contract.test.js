import sinon from 'sinon';
import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import * as exceptions from '../../../src/package/exceptions';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contract';
import * as Contract from '../../../src/package/contract';
import * as baseContract from '../../../src/package/base-contract';
import * as test from '../../testnet-config';
import * as accounts from '../../accounts';
import { abi, data } from '../../abi';

jest.setTimeout(10000);

describe('contract', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    const provider = ganache.provider(test.options);
    web3Provisioned.web3.setProvider(provider);
    const undeployedContract = new web3Provisioned.web3.eth.Contract(abi, { data });
    const contract = await undeployedContract.deploy().send(test.deploymentOptions);
    deployedContract.contract = contract;
  });

  describe('calls', () => {
    it('initial getArcadeState should be initial values', async () => {
      const expected = {
        isParticipant: false, jackpot: 0, price: 250000000000000, round: 1,
      };
      const output = await Contract.getArcadeState(accounts.user.address);
      expect(output).toEqual(expected);
    });
  });

  describe('transactions', () => {
    it('initial pay should be affect jackpot and participation', async () => {
      const expected = {
        isParticipant: true, jackpot: 225000000000000,
      };
      const output = await Contract.pay(accounts.user.address);
      expect(output).toEqual(expected);
    });

    it('upload score should fail if not participant', async () => {
      const score = 1;
      const messageHash = '0xa2b3fa66f50925b9648e1f4a0ab934a76c2d5d99f0fbdf5e7293b153a08516b2';
      const v = '0x1c';
      const r = '0x2aaf6d6b8e6084b4b8220b81501da9565661d84dfc85474827d2aeaf47af1428';
      const s = '0x29669f85961770eb3d9ad36e7808ebf3cd616ad717bfb642f805f053a820f3d2';
      const signature = {
        messageHash, v, r, s,
      };
      await Contract
        .uploadScore(signature, accounts.user2.address, score)
        .catch(e => (expect(e))
          .toEqual(exceptions.UserHasNotPaid));
    });

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

      it('upload score should fail if not signed by owner', async () => {
        const score = 1;
        const signature = { message: '0x484c0d310d5537808d822a42e86b7bd996db9520450a2efb764d88745a488f0f', messageHash: '0xa2b3fa66f50925b9648e1f4a0ab934a76c2d5d99f0fbdf5e7293b153a08516b2', v: '0x1c', r: '0x42c47c4647da1db355a773d8847f4089f6beea98c2e2e2c55ef6af2348589830', s: '0x3941fbca051659c927ceebb6322f7801957688ca457eef480d473ec1010f89a9', signature: '0x42c47c4647da1db355a773d8847f4089f6beea98c2e2e2c55ef6af23485898303941fbca051659c927ceebb6322f7801957688ca457eef480d473ec1010f89a91c' }; // eslint-disable-line object-curly-newline
        Contract.uploadScore(signature, accounts.user.address, score)
          .catch(e => (expect(e))
            .toEqual(exceptions.TransactionFailure));
      });

      it('upload score should succeed if participant', async () => {
        const expected = {
          isParticipant: false, jackpot: 0, round: 2,
        };
        const score = 1;
        const messageHash = '0xa2b3fa66f50925b9648e1f4a0ab934a76c2d5d99f0fbdf5e7293b153a08516b2';
        const v = '0x1c';
        const r = '0x2aaf6d6b8e6084b4b8220b81501da9565661d84dfc85474827d2aeaf47af1428';
        const s = '0x29669f85961770eb3d9ad36e7808ebf3cd616ad717bfb642f805f053a820f3d2';
        const signature = {
          messageHash, v, r, s,
        };
        const output = await Contract
          .uploadScore(signature, accounts.user.address, score);
        expect(output).toEqual(expected);
      });
    });
  });

  describe('MetaMask error', () => {
    beforeEach(() => {
      sinon.stub(baseContract, 'uploadScore');
    });

    afterEach(() => {
      baseContract.uploadScore.restore();
    });

    it('handledUploadScore should throw MetaMaskError', async () => {
      baseContract.uploadScore.returns(Promise.reject());
      await expect(Contract.handledUploadScore()).rejects.toEqual(exceptions.MetamaskError);
    });
  });
});

