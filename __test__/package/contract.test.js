import sinon from 'sinon';
import * as exceptions from '../../src/package/exceptions';
import { web3, owner, user } from '../../src/package/web3-provisioned';
import * as baseContract from '../../src/package/base-contract';
import {
  handledPay,
  handledUploadScore,
  handledAdjustPrice,
} from '../../src/package/contract';

require('events').EventEmitter.defaultMaxListeners = Infinity;

jest.mock('../../src/package/web3-provisioned');
jest.mock('../../src/package/deployed-contract');

describe('contract', () => {
  beforeEach(async () => {
    jest.resetModules();
  });

  it('initial getArcadeState should be initial values', async () => {
    const Contract = require('../../src/package/contract'); // eslint-disable-line global-require
    const expected = {
      isParticipant: false, jackpot: 0, price: 250000000000000, round: 1,
    };
    const output = await Contract.getArcadeState(user.address);
    expect(output).toEqual(expected);
  });

  it('initial pay should be affect jackpot and participation', async () => {
    const Contract = require('../../src/package/contract'); // eslint-disable-line global-require
    const expected = {
      isParticipant: true, jackpot: 225000000000000,
    };
    const output = await Contract.pay(user.address);
    expect(output).toEqual(expected);
  });

  it('upload score should fail if not participant', async () => {
    const Contract = require('../../src/package/contract'); // eslint-disable-line global-require
    const score = 1;
    const msg = web3.utils.soliditySha3(
      { type: 'address', value: (await Contract.getAddress()) },
      { type: 'address', value: user.address },
      { type: 'uint256', value: score },
    );
    const signature = web3.eth.accounts.sign(msg, owner.privateKey);
    Contract.uploadScore(signature, user.address, user.address, score)
      .catch(e => (expect(e)).toEqual(exceptions.UserHasNotPaid));
  });

  it('upload score should fail if not signed by owner', async () => {
    const Contract = require('../../src/package/contract'); // eslint-disable-line global-require
    await Contract.pay(user.address);
    const score = 1;
    const msg = web3.utils.soliditySha3(
      { type: 'address', value: (await Contract.getAddress()) },
      { type: 'address', value: user.address },
      { type: 'uint256', value: score },
    );
    const signature = web3.eth.accounts.sign(msg, user.privateKey);
    Contract.uploadScore(signature, user.address, user.address, score)
      .catch(e => (expect(e)).toEqual(exceptions.TransactionFailure));
  });

  it('upload score should succeed if participant', async () => {
    const Contract = require('../../src/package/contract'); // eslint-disable-line global-require
    const expected = {
      isParticipant: false, jackpot: 0, round: 2,
    };
    await Contract.pay(user.address);
    const score = 1;
    const msg = web3.utils.soliditySha3(
      { type: 'address', value: (await Contract.getAddress()) },
      { type: 'address', value: user.address },
      { type: 'uint256', value: score },
    );
    const signature = web3.eth.accounts.sign(msg, owner.privateKey);
    const output = await Contract.uploadScore(signature, user.address, user.address, score);
    expect(output).toEqual(expected);
  });

  it('adjust price should succeed', async () => {
    const Contract = require('../../src/package/contract'); // eslint-disable-line global-require
    const expected = {
      price: 20,
    };
    const price = 20;
    const msg = web3.utils.soliditySha3(
      { type: 'address', value: (await Contract.getAddress()) },
      { type: 'address', value: user.address },
      { type: 'uint256', value: price },
    );
    const signature = web3.eth.accounts.sign(msg, owner.privateKey);
    const output = await Contract.adjustPrice(signature, user.address, price);
    expect(output).toEqual(expected);
  });

  it('adjust price fail if not signed by owner', async () => {
    const Contract = require('../../src/package/contract'); // eslint-disable-line global-require
    const price = 20;
    const msg = web3.utils.soliditySha3(
      { type: 'address', value: (await Contract.getAddress()) },
      { type: 'address', value: user.address },
      { type: 'uint256', value: price },
    );
    const signature = web3.eth.accounts.sign(msg, user.privateKey);
    Contract.adjustPrice(signature, user.address, price)
      .catch(e => (expect(e)).toEqual(exceptions.TransactionFailure));
  });
});

describe('MetaMask error', () => {
  beforeEach(() => {
    sinon.stub(baseContract, 'unhandledPay');
    sinon.stub(baseContract, 'unhandledUploadScore');
    sinon.stub(baseContract, 'unhandledAdjustPrice');
  });

  afterEach(() => {
    baseContract.unhandledPay.restore();
    baseContract.unhandledUploadScore.restore();
    baseContract.unhandledAdjustPrice.restore();
  });

  it('handledPay handle should throw MetaMaskError', async () => {
    baseContract.unhandledPay.returns(Promise.reject());
    await expect(handledPay()).rejects.toEqual(exceptions.MetamaskError);
  });

  it('handledUploadScore should throw MetaMaskError', async () => {
    baseContract.unhandledUploadScore.returns(Promise.reject());
    await expect(handledUploadScore()).rejects.toEqual(exceptions.MetamaskError);
  });

  it('handledAdjustPrice should throw MetaMaskError', async () => {
    baseContract.unhandledAdjustPrice.returns(Promise.reject());
    await expect(handledAdjustPrice()).rejects.toEqual(exceptions.MetamaskError);
  });
});

