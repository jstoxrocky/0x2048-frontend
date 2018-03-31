import sinon from 'sinon';
import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import * as api from '../../../src/package/api';
import * as exceptions from '../../../src/package/exceptions';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as endpoints from '../../../src/package/endpoints';
import * as test from '../../testnet-config';
import * as arcadeContract from '../../../src/package/arcade-contract';

describe('endpoints', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
    web3Provisioned.network = test.network;
  });

  it('move should succeed', async () => {
    sinon.stub(api, 'move');
    const expected = 1337;
    api.move.returns(Promise.resolve(expected));
    const output = await endpoints.move();
    expect(output).toEqual(expected);
    api.move.restore();
  });

  it('gameState should succeed', async () => {
    sinon.stub(api, 'gameState');
    const expected = 1337;
    api.gameState.returns(Promise.resolve(expected));
    const output = await endpoints.gameState();
    expect(output).toEqual(expected);
    api.gameState.restore();
  });

  it('newGame should throw ValidationError from nonce', async () => {
    sinon.stub(api, 'nonce');
    const value = 123456;
    api.nonce.returns(Promise.resolve({ value }));
    await expect(endpoints.newGame()).rejects.toEqual(exceptions.ValidationError);
    api.nonce.restore();
  });

  it('newGame should throw ValidationError from gamestate', async () => {
    sinon.stub(api, 'nonce');
    sinon.stub(arcadeContract, 'pay');
    sinon.stub(api, 'addressConfirmation');
    sinon.stub(api, 'paymentConfirmation');
    const nonce = '0x01';
    const gamestate = {};
    api.nonce.returns(Promise.resolve({ nonce }));
    api.paymentConfirmation.returns(Promise.resolve(gamestate));
    await expect(endpoints.newGame()).rejects.toEqual(exceptions.ValidationError);
    api.nonce.restore();
    api.addressConfirmation.restore();
    api.paymentConfirmation.restore();
  });

  it('getArcadeState should succeed', async () => {
    sinon.stub(arcadeContract, 'getArcadeState');
    const expected = 1337;
    arcadeContract.getArcadeState.returns(Promise.resolve(expected));
    const output = await endpoints.getArcadeState();
    expect(output).toEqual(expected);
    arcadeContract.getArcadeState.restore();
  });

  it('uploadScore should succeed', async () => {
    sinon.stub(arcadeContract, 'uploadScore');
    const expected = 1337;
    arcadeContract.uploadScore.returns(Promise.resolve(expected));
    const output = await endpoints.uploadScore();
    expect(output).toEqual(expected);
    arcadeContract.uploadScore.restore();
  });

  it('should throw NoWeb3Provider with web3 undefined', async () => {
    // endpoints.gameState() not included since it does not require metamask
    web3Provisioned.web3 = undefined;
    await expect(endpoints.move()).rejects.toEqual(exceptions.NoWeb3Provider);
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
    await expect(endpoints.newGame()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.NoAccountsAvailable);
    await expect(endpoints.uploadScore()).rejects.toEqual(exceptions.NoAccountsAvailable);
  });

  it('should throw WrongNetwork with wrong network', async () => {
    // endpoints.gameState() not included since it does not require metamask
    const provider = ganache.provider({ network_id: 31337 });
    web3Provisioned.web3.setProvider(provider);
    await expect(endpoints.move()).rejects.toEqual(exceptions.WrongNetwork);
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
