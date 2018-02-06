import sinon from 'sinon';
import Web3 from 'web3';
import ganache from 'ganache-core';
import * as api from '../../../src/package/api';
import * as exceptions from '../../../src/package/exceptions';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as endpoints from '../../../src/package/endpoints';
import * as test from './test-setup/test-provider';
import * as Contract from '../../../src/package/contract';

describe('endpoints', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
    web3Provisioned.network = test.network;
  });

  beforeEach(() => {
    sinon.stub(api, 'gameState');
    sinon.stub(api, 'move');
    sinon.stub(api, 'price');
    sinon.stub(Contract, 'getArcadeState');
    sinon.stub(Contract, 'pay');
    sinon.stub(Contract, 'uploadScore');
    sinon.stub(Contract, 'adjustPrice');
  });

  afterEach(() => {
    api.gameState.restore();
    api.move.restore();
    api.price.restore();
    Contract.getArcadeState.restore();
    Contract.pay.restore();
    Contract.uploadScore.restore();
    Contract.adjustPrice.restore();
  });

  it('gameState should succeed', async () => {
    const expected = 1337;
    api.gameState.returns(Promise.resolve(expected));
    const output = await endpoints.gameState();
    expect(output).toEqual(expected);
  });

  it('move should succeed', async () => {
    const expected = 1337;
    api.move.returns(Promise.resolve(expected));
    const output = await endpoints.move();
    expect(output).toEqual(expected);
  });

  it('getArcadeState should succeed', async () => {
    const expected = 1337;
    Contract.getArcadeState.returns(Promise.resolve(expected));
    const output = await endpoints.getArcadeState();
    expect(output).toEqual(expected);
  });

  it('pay should succeed', async () => {
    const expected = 1337;
    Contract.pay.returns(Promise.resolve(expected));
    const output = await endpoints.pay();
    expect(output).toEqual(expected);
  });

  it('uploadScore should succeed', async () => {
    const expected = 1337;
    Contract.uploadScore.returns(Promise.resolve(expected));
    const output = await endpoints.uploadScore();
    expect(output).toEqual(expected);
  });

  it('adjustPrice should succeed', async () => {
    const expected = 1337;
    api.price.returns(Promise.resolve({ signature: null, price: null }));
    Contract.adjustPrice.returns(Promise.resolve(expected));
    const output = await endpoints.adjustPrice();
    expect(output).toEqual(expected);
  });

  it('should throw NoWeb3Provider with web3 undefined', async () => {
    web3Provisioned.web3 = undefined;
    await expect(endpoints.move()).rejects.toEqual(exceptions.NoWeb3Provider);
    await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.NoWeb3Provider);
    await expect(endpoints.pay()).rejects.toEqual(exceptions.NoWeb3Provider);
    await expect(endpoints.pay()).rejects.toEqual(exceptions.NoWeb3Provider);
    await expect(endpoints.adjustPrice()).rejects.toEqual(exceptions.NoWeb3Provider);
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
  });

  it.skip('should throw NoAccountsAvailable with no accounts available', async () => {
    // Skipped for now as no way to specify zero accounts create in Ganache
    const provider = ganache.provider({ total_accounts: 0 });
    web3Provisioned.web3.setProvider(provider);
    await expect(endpoints.move()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.pay()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.uploadScore()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.adjustPrice()).rejects.toEqual(exceptions.NoAccountsAvailable);
  });

  it('should throw WrongNetwork with wrong network', async () => {
    const provider = ganache.provider({ network_id: 31337 });
    web3Provisioned.web3.setProvider(provider);
    await expect(endpoints.move()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.pay()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.uploadScore()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.adjustPrice()).rejects.toEqual(exceptions.WrongNetwork);
  });
});
