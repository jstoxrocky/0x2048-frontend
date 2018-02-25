import sinon from 'sinon';
import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import * as api from '../../../src/package/api';
import * as exceptions from '../../../src/package/exceptions';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as endpoints from '../../../src/package/endpoints';
import * as test from '../../testnet-config';
import * as Contract from '../../../src/package/contract';

describe('endpoints', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
    web3Provisioned.network = test.network;
  });

  beforeEach(() => {
    sinon.stub(api, 'move');
    sinon.stub(api, 'gameState');
    sinon.stub(api, 'postIOU');
    sinon.stub(api, 'getIOU');
    sinon.stub(Contract, 'getArcadeState');
    sinon.stub(Contract, 'uploadScore');
  });

  afterEach(() => {
    api.move.restore();
    api.gameState.restore();
    api.postIOU.restore();
    api.getIOU.restore();
    Contract.getArcadeState.restore();
    Contract.uploadScore.restore();
  });

  it('move should succeed', async () => {
    const expected = 1337;
    api.move.returns(Promise.resolve(expected));
    const output = await endpoints.move();
    expect(output).toEqual(expected);
  });

  it('gameState should succeed', async () => {
    const expected = 1337;
    api.gameState.returns(Promise.resolve(expected));
    const output = await endpoints.gameState();
    expect(output).toEqual(expected);
  });

  it('postIOU should succeed', async () => {
    const expected = 1337;
    api.postIOU.returns(Promise.resolve(expected));
    const output = await endpoints.postIOU();
    expect(output).toEqual(expected);
  });

  it('getIOU should succeed', async () => {
    const expected = 1337;
    api.getIOU.returns(Promise.resolve(expected));
    const output = await endpoints.getIOU();
    expect(output).toEqual(expected);
  });

  it('getArcadeState should succeed', async () => {
    const expected = 1337;
    Contract.getArcadeState.returns(Promise.resolve(expected));
    const output = await endpoints.getArcadeState();
    expect(output).toEqual(expected);
  });

  it('uploadScore should succeed', async () => {
    const expected = 1337;
    Contract.uploadScore.returns(Promise.resolve(expected));
    const output = await endpoints.uploadScore();
    expect(output).toEqual(expected);
  });

  it('should throw NoWeb3Provider with web3 undefined', async () => {
    // endpoints.gameState() not included since it does not require metamask
    web3Provisioned.web3 = undefined;
    await expect(endpoints.move()).rejects.toEqual(exceptions.NoWeb3Provider);
    await expect(endpoints.postIOU()).rejects.toEqual(exceptions.NoWeb3Provider);
    await expect(endpoints.getIOU()).rejects.toEqual(exceptions.NoWeb3Provider);
    await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.NoWeb3Provider);
    await expect(endpoints.uploadScore()).rejects.toEqual(exceptions.NoWeb3Provider);
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
  });

  it.skip('should throw NoAccountsAvailable with no accounts available', async () => {
    // Skipped for now as no way to specify zero accounts create in Ganache
    const provider = ganache.provider({ total_accounts: 0 });
    web3Provisioned.web3.setProvider(provider);
    await expect(endpoints.move()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.postIOU()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.getIOU()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.uploadScore()).rejects.toEqual(exceptions.NoAccountsAvailable);
  });

  it('should throw WrongNetwork with wrong network', async () => {
    // endpoints.gameState() not included since it does not require metamask
    const provider = ganache.provider({ network_id: 31337 });
    web3Provisioned.web3.setProvider(provider);
    await expect(endpoints.move()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.postIOU()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.getIOU()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.uploadScore()).rejects.toEqual(exceptions.WrongNetwork);
  });
});
