import ganache from 'ganache-core';
import * as api from '../../src/package/api';
import * as exceptions from '../../src/package/exceptions';
import { web3, owner, user } from '../../src/package/web3-provisioned';
import contractPromise from '../../src/package/deployed-contract';

jest.mock('../../src/package/web3-provisioned');
jest.mock('../../src/package/api');
jest.mock('../../src/package/deployed-contract');

describe('endpoints', () => {
  beforeEach(async () => {
    jest.resetModules();
  });

  it('move should succeed', async () => {
    const endpoints = require('../../src/package/endpoints'); // eslint-disable-line global-require
    const direction = 1;
    const output = await endpoints.move(direction);
    expect(output).toEqual(api.movePayload);
  });

  it('getArcadeState should succeed', async () => {
    const endpoints = require('../../src/package/endpoints'); // eslint-disable-line global-require
    const expected = {
      isParticipant: false, jackpot: 0, price: 250000000000000, round: 1,
    };
    const output = await endpoints.getArcadeState();
    expect(output).toEqual(expected);
  });

  it('pay should succeed', async () => {
    const endpoints = require('../../src/package/endpoints'); // eslint-disable-line global-require
    const expected = {
      isParticipant: true, jackpot: 225000000000000,
    };
    const output = await endpoints.pay();
    expect(output).toEqual(expected);
  });

  it('uploadScore should succeed', async () => {
    const endpoints = require('../../src/package/endpoints'); // eslint-disable-line global-require
    const contract = await contractPromise;
    const expected = {
      isParticipant: false, jackpot: 0, round: 2,
    };
    await endpoints.pay();
    const score = 1;
    const msg = web3.utils.soliditySha3(
      { type: 'address', value: contract._address }, // eslint-disable-line no-underscore-dangle
      { type: 'address', value: user.address },
      { type: 'uint256', value: score },
    );
    const signature = web3.eth.accounts.sign(msg, owner.privateKey);
    const output = await endpoints.uploadScore(signature, user.address, score);
    expect(output).toEqual(expected);
  });

  it('adjustPrice should succeed', async () => {
    const endpoints = require('../../src/package/endpoints'); // eslint-disable-line global-require
    const expected = {
      price: 20,
    };
    const output = await endpoints.adjustPrice();
    expect(output).toEqual(expected);
  });

  it('should throw NoWeb3Provider with web3 undefined', async () => {
    const endpoints = require('../../src/package/endpoints'); // eslint-disable-line global-require
    const Web3 = require('../../src/package/web3-provisioned'); // eslint-disable-line global-require
    Web3.web3 = undefined;
    await expect(endpoints.move()).rejects.toEqual(exceptions.NoWeb3Provider);
    await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.NoWeb3Provider);
    await expect(endpoints.pay()).rejects.toEqual(exceptions.NoWeb3Provider);
    await expect(endpoints.pay()).rejects.toEqual(exceptions.NoWeb3Provider);
    await expect(endpoints.adjustPrice()).rejects.toEqual(exceptions.NoWeb3Provider);
  });

  it.skip('should throw NoAccountsAvailable with no accounts available', async () => {
    // Skipped for now as no way to specify zero accounts create in Ganache
    const endpoints = require('../../src/package/endpoints'); // eslint-disable-line global-require
    const { web3 } = require('../../src/package/web3-provisioned'); // eslint-disable-line global-require, no-shadow
    const provider = ganache.provider({ total_accounts: 0 });
    web3.setProvider(provider);
    await expect(endpoints.move()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.pay()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.uploadScore()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.adjustPrice()).rejects.toEqual(exceptions.NoAccountsAvailable);
  });

  it('should throw WrongNetwork with wrong network', async () => {
    const endpoints = require('../../src/package/endpoints'); // eslint-disable-line global-require
    const { web3 } = require('../../src/package/web3-provisioned'); // eslint-disable-line global-require, no-shadow
    const provider = ganache.provider({ network_id: 31337 });
    web3.setProvider(provider);
    await expect(endpoints.move()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.pay()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.uploadScore()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.adjustPrice()).rejects.toEqual(exceptions.WrongNetwork);
  });
});
