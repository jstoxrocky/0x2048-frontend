import sinon from 'sinon';
import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import * as api from '../../../src/package/api';
import * as iou from '../../../src/package/iou';
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
    sinon.stub(api, 'iou');
    sinon.stub(api, 'nonce');
    sinon.stub(iou, 'default');
    sinon.stub(Contract, 'getArcadeState');
    sinon.stub(Contract, 'uploadScore');
  });

  afterEach(() => {
    api.move.restore();
    api.gameState.restore();
    api.iou.restore();
    api.nonce.restore();
    iou.default.restore();
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

  it('iou should succeed', async () => {
    const expected = 1337;
    api.iou.returns(Promise.resolve(expected));
    const output = await endpoints.iou();
    expect(output).toEqual(expected);
  });

  it('newGame should succeed', async () => {
    const expected = 1337;
    api.nonce.returns(Promise.resolve(expected));
    iou.default.returns(Promise.resolve(expected));
    api.iou.returns(Promise.resolve(expected));
    const output = await endpoints.newGame();
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
    await expect(endpoints.iou()).rejects.toEqual(exceptions.NoWeb3Provider);
    await expect(endpoints.newGame()).rejects.toEqual(exceptions.NoWeb3Provider);
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
    await expect(endpoints.iou()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.newGame()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.uploadScore()).rejects.toEqual(exceptions.NoAccountsAvailable);
  });

  it('should throw WrongNetwork with wrong network', async () => {
    // endpoints.gameState() not included since it does not require metamask
    const provider = ganache.provider({ network_id: 31337 });
    web3Provisioned.web3.setProvider(provider);
    await expect(endpoints.move()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.iou()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.newGame()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.WrongNetwork);
    await expect(endpoints.uploadScore()).rejects.toEqual(exceptions.WrongNetwork);
  });

  afterAll('shutdown', (done) => {
    const provider = web3Provisioned.web3._provider; // eslint-disable-line no-underscore-dangle
    web3Provisioned.web3.setProvider();
    provider.close(done);
  });
});
