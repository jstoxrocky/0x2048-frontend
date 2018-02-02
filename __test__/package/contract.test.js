import sinon from 'sinon';
import Web3 from 'web3';
import * as exceptions from '../../src/package/exceptions';
import * as web3Provisioned from '../../src/package/web3-provisioned';
import * as deployedContract from '../../src/package/deployed-contract';
import * as Contract from '../../src/package/contract';
import * as baseContract from '../../src/package/base-contract';
import * as test from './test-setup/test-provider';
import { abi, data } from './test-setup/abi';

jest.setTimeout(10000);

describe('contract', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(test.provider);
    const undeployedContract = new web3Provisioned.web3.eth.Contract(abi, { data });
    const contract = await undeployedContract.deploy().send(test.deploymentOptions);
    contract.setProvider(test.provider);
    deployedContract.contract = contract;
  });

  describe('calls', () => {
    it('initial getArcadeState should be initial values', async () => {
      const expected = {
        isParticipant: false, jackpot: 0, price: 250000000000000, round: 1,
      };
      const output = await Contract.getArcadeState(test.user.address);
      expect(output).toEqual(expected);
    });
  });

  describe('transactions', () => {
    it('initial pay should be affect jackpot and participation', async () => {
      const expected = {
        isParticipant: true, jackpot: 225000000000000,
      };
      const output = await Contract.pay(test.user.address);
      expect(output).toEqual(expected);
    });

    it('upload score should fail if not participant', async () => {
      const score = 1;
      const signature = { message: '0x484c0d310d5537808d822a42e86b7bd996db9520450a2efb764d88745a488f0f', messageHash: '0xa2b3fa66f50925b9648e1f4a0ab934a76c2d5d99f0fbdf5e7293b153a08516b2', v: '0x1c', r: '0x2aaf6d6b8e6084b4b8220b81501da9565661d84dfc85474827d2aeaf47af1428', s: '0x29669f85961770eb3d9ad36e7808ebf3cd616ad717bfb642f805f053a820f3d2', signature: '0x2aaf6d6b8e6084b4b8220b81501da9565661d84dfc85474827d2aeaf47af142829669f85961770eb3d9ad36e7808ebf3cd616ad717bfb642f805f053a820f3d21c' }; // eslint-disable-line object-curly-newline
      Contract.uploadScore(signature, test.user.address, test.user.address, score)
        .catch(e => (expect(e))
          .toEqual(exceptions.UserHasNotPaid));
    });

    it('adjust price should succeed', async () => {
      const expected = {
        price: 20,
      };
      const price = 20;
      const signature = { message: '0xc433cc18451df237ae66e959bb96c0e138f574b03e2935961a761b65e15bfe9e', messageHash: '0x0ac72c075b9b1176cd7207ae57038d363553c8ec552c19abec25d31204fc6c01', v: '0x1c', r: '0x987c73122c6ce34ac55396f51a77f4fd3ed8ad98bb42320efaf4fc55176f36fb', s: '0x0ffe8cfaac7a0e9588cd687232cc54f70b396c3854d63fea76ee2a0132b96b95', signature: '0x987c73122c6ce34ac55396f51a77f4fd3ed8ad98bb42320efaf4fc55176f36fb0ffe8cfaac7a0e9588cd687232cc54f70b396c3854d63fea76ee2a0132b96b951c' }; // eslint-disable-line object-curly-newline
      const output = await Contract.adjustPrice(signature, test.user.address, price);
      expect(output).toEqual(expected);
    });

    it('adjust price fail if not signed by owner', async () => {
      const price = 20;
      const signature = { message: '0xc433cc18451df237ae66e959bb96c0e138f574b03e2935961a761b65e15bfe9e', messageHash: '0x0ac72c075b9b1176cd7207ae57038d363553c8ec552c19abec25d31204fc6c01', v: '0x1b', r: '0x4dfab961b5e17228d072abd3df1a8f56039aef2097dbfa204b417ccc3f380f0e', s: '0x14d7e875bbd204f0f25215c66b0de35be2e5139cec692cf7d30d632118943c73', signature: '0x4dfab961b5e17228d072abd3df1a8f56039aef2097dbfa204b417ccc3f380f0e14d7e875bbd204f0f25215c66b0de35be2e5139cec692cf7d30d632118943c731b' }; // eslint-disable-line object-curly-newline
      Contract.adjustPrice(signature, test.user.address, price)
        .catch(e => (expect(e))
          .toEqual(exceptions.TransactionFailure));
    });

    describe('requires user to be participant', () => {
      beforeEach(async () => {
        const isParticipant = await baseContract.getParticipation(test.user.address);
        if (!isParticipant) {
          const expected = 1;
          const price = await baseContract.getPrice();
          const receipt = await baseContract.pay(test.user.address, price);
          expect(receipt.status).toBe(expected);
        }
      });

      it('upload score should fail if not signed by owner', async () => {
        const score = 1;
        const signature = { message: '0x484c0d310d5537808d822a42e86b7bd996db9520450a2efb764d88745a488f0f', messageHash: '0xa2b3fa66f50925b9648e1f4a0ab934a76c2d5d99f0fbdf5e7293b153a08516b2', v: '0x1c', r: '0x42c47c4647da1db355a773d8847f4089f6beea98c2e2e2c55ef6af2348589830', s: '0x3941fbca051659c927ceebb6322f7801957688ca457eef480d473ec1010f89a9', signature: '0x42c47c4647da1db355a773d8847f4089f6beea98c2e2e2c55ef6af23485898303941fbca051659c927ceebb6322f7801957688ca457eef480d473ec1010f89a91c' }; // eslint-disable-line object-curly-newline
        Contract.uploadScore(signature, test.user.address, test.user.address, score)
          .catch(e => (expect(e))
            .toEqual(exceptions.TransactionFailure));
      });

      it('upload score should succeed if participant', async () => {
        const expected = {
          isParticipant: false, jackpot: 0, round: 2,
        };
        const score = 1;
        const signature = { message: '0x484c0d310d5537808d822a42e86b7bd996db9520450a2efb764d88745a488f0f', messageHash: '0xa2b3fa66f50925b9648e1f4a0ab934a76c2d5d99f0fbdf5e7293b153a08516b2', v: '0x1c', r: '0x42c47c4647da1db355a773d8847f4089f6beea98c2e2e2c55ef6af2348589830', s: '0x3941fbca051659c927ceebb6322f7801957688ca457eef480d473ec1010f89a9', signature: '0x42c47c4647da1db355a773d8847f4089f6beea98c2e2e2c55ef6af23485898303941fbca051659c927ceebb6322f7801957688ca457eef480d473ec1010f89a91c' }; // eslint-disable-line object-curly-newline
        const output = await Contract
          .uploadScore(signature, test.user.address, test.user.address, score);
        expect(output).toEqual(expected);
      });
    });
  });

  describe('MetaMask error', () => {
    beforeEach(() => {
      sinon.stub(baseContract, 'pay');
      sinon.stub(baseContract, 'uploadScore');
      sinon.stub(baseContract, 'adjustPrice');
    });

    afterEach(() => {
      baseContract.pay.restore();
      baseContract.uploadScore.restore();
      baseContract.adjustPrice.restore();
    });

    it('handledPay handle should throw MetaMaskError', async () => {
      baseContract.pay.returns(Promise.reject());
      await expect(Contract.handledPay()).rejects.toEqual(exceptions.MetamaskError);
    });

    it('handledUploadScore should throw MetaMaskError', async () => {
      baseContract.uploadScore.returns(Promise.reject());
      await expect(Contract.handledUploadScore()).rejects.toEqual(exceptions.MetamaskError);
    });

    it('handledAdjustPrice should throw MetaMaskError', async () => {
      baseContract.adjustPrice.returns(Promise.reject());
      await expect(Contract.handledAdjustPrice()).rejects.toEqual(exceptions.MetamaskError);
    });
  });
});

