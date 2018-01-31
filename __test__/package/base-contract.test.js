import { web3, owner, user } from '../../src/package/web3-provisioned';

require('events').EventEmitter.defaultMaxListeners = Infinity;

jest.mock('../../src/package/web3-provisioned');
jest.mock('../../src/package/deployed-contract');

describe('base contract', () => {
  beforeEach(async () => {
    jest.resetModules();
  });

  it('initial round should be 1', async () => {
    const baseContract = require('../../src/package/base-contract'); // eslint-disable-line global-require
    const expected = 1;
    const output = await baseContract.unhandledGetRound();
    expect(output).toBe(expected);
  });

  it('initial jackpot should be 0', async () => {
    const baseContract = require('../../src/package/base-contract'); // eslint-disable-line global-require
    const expected = 0;
    const output = await baseContract.unhandledGetJackpot();
    expect(output).toBe(expected);
  });

  it('initial price should be 250000000000000', async () => {
    const baseContract = require('../../src/package/base-contract'); // eslint-disable-line global-require
    const expected = 250000000000000;
    const output = await baseContract.unhandledGetPrice();
    expect(output).toBe(expected);
  });

  it('initial isParticipant should be false', async () => {
    const baseContract = require('../../src/package/base-contract'); // eslint-disable-line global-require
    const expected = false;
    const output = await baseContract.unhandledGetParticipation(owner.address);
    expect(output).toBe(expected);
  });

  it('initial pay should be affect jackpot and participation', async () => {
    const baseContract = require('../../src/package/base-contract'); // eslint-disable-line global-require
    const expected = '0x01';
    const price = await baseContract.unhandledGetPrice();
    const receipt = await baseContract.unhandledPay(user.address, price);
    expect(receipt.status).toBe(expected);
  });

  it('upload score should succeed if participant', async () => {
    const baseContract = require('../../src/package/base-contract'); // eslint-disable-line global-require
    const expected = '0x01';
    const price = await baseContract.unhandledGetPrice();
    await baseContract.unhandledPay(user.address, price);
    const score = 1;
    const msg = web3.utils.soliditySha3(
      { type: 'address', value: (await baseContract.getAddress()) },
      { type: 'address', value: user.address },
      { type: 'uint256', value: score },
    );
    const signature = web3.eth.accounts.sign(msg, owner.privateKey);
    const {
      messageHash, v, r, s,
    } = signature;
    const receipt = await baseContract
      .unhandledUploadScore(user.address, messageHash, v, r, s, user.address, score);
    expect(receipt.status).toBe(expected);
  });

  it('adjust price should succeed', async () => {
    const baseContract = require('../../src/package/base-contract'); // eslint-disable-line global-require
    const expected = '0x01';
    const price = 20;
    const msg = web3.utils.soliditySha3(
      { type: 'address', value: (await baseContract.getAddress()) },
      { type: 'address', value: user.address },
      { type: 'uint256', value: price },
    );
    const signature = web3.eth.accounts.sign(msg, owner.privateKey);
    const {
      messageHash, v, r, s,
    } = signature;
    const receipt = await baseContract
      .unhandledAdjustPrice(messageHash, v, r, s, user.address, price);
    expect(receipt.status).toBe(expected);
  });
});
