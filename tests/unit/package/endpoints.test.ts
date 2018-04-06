import sinon from 'sinon';
import Web3 from 'web3';
import ganache from 'ganache-core';
import * as api from '../../../src/package/api';
import * as exceptions from '../../../src/package/exceptions';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as endpoints from '../../../src/package/endpoints';
import * as test from '../../testnet-config';
import * as arcadeContract from '../../../src/package/arcade-contract';
import * as signer from '../../../src/package/sign-nonce';
import * as accounts from '../../accounts';

let web3;
let network;

describe('endpoint', async () => {
  beforeAll(async () => {
    web3 = sinon.stub(web3Provisioned, 'web3').value(new Web3());
  });

  beforeEach(async () => {
    const provider = ganache.provider(test.options);
    web3Provisioned.web3.setProvider(provider);
    network = sinon.stub(web3Provisioned, 'network').value(test.network);
  });

  describe('move', async () => {
    it('should succeed and return something', async () => {
      const move = sinon.stub(api, 'move');
      const expected = 1337;
      const direction = 1;
      move.returns(Promise.resolve(expected));
      const output = await endpoints.move(direction);
      expect(output).toEqual(expected);
      move.restore();
    });
  });

  describe('uploadScore', async () => {
    it('should succeed and return something', async () => {
      const uploadScore = sinon.stub(arcadeContract, 'uploadScore');
      const expected = 1337;
      const v = '0x00';
      const r = '0x00';
      const s = '0x00';
      const score = 1;
      const recoveredAddress = accounts.user.address;
      uploadScore.returns(Promise.resolve(expected));
      const output = await endpoints.uploadScore(v, r, s, recoveredAddress, score);
      expect(output).toEqual(expected);
      uploadScore.restore();
    });

    it('should throw NoWeb3Provider with web3 undefined', async () => {
      web3 = sinon.stub(web3Provisioned, 'web3').value(undefined);
      const v = '0x00';
      const r = '0x00';
      const s = '0x00';
      const score = 1;
      const recoveredAddress = accounts.user.address;
      await expect(endpoints.uploadScore(v, r, s, recoveredAddress, score)).rejects.toEqual(exceptions.NoWeb3Provider);
      web3.restore();
    });

    it('should throw WrongNetwork with wrong network', async () => {
      network = sinon.stub(web3Provisioned, 'network').value(31337);
      const v = '0x00';
      const r = '0x00';
      const s = '0x00';
      const score = 1;
      const recoveredAddress = accounts.user.address;
      await expect(endpoints.uploadScore(v, r, s, recoveredAddress, score)).rejects.toEqual(exceptions.WrongNetwork);
      network.restore();
    });
  });

  describe('gameState', async () => {
    it('should succeed and return something', async () => {
      const gameState = sinon.stub(api, 'gameState');
      const expected = 1337;
      gameState.returns(Promise.resolve(expected));
      const output = await endpoints.gameState();
      expect(output).toEqual(expected);
      gameState.restore();
    });
  });

  describe('getArcadeState', async () => {
    it('should succeed and return something', async () => {
      const getArcadeState = sinon.stub(arcadeContract, 'getArcadeState');
      const expected = 1337;
      getArcadeState.returns(Promise.resolve(expected));
      const output = await endpoints.getArcadeState();
      expect(output).toEqual(expected);
      getArcadeState.restore();
    });

    it('should throw NoWeb3Provider with web3 undefined', async () => {
      web3 = sinon.stub(web3Provisioned, 'web3').value(undefined);
      await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.NoWeb3Provider);
      web3.restore();
    });

    it('should throw WrongNetwork with wrong network', async () => {
      network = sinon.stub(web3Provisioned, 'network').value(31337);
      await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.WrongNetwork);
      network.restore();
    });
  });

  describe('newGame', async () => {
    it('should succeed and return something', async () => {
      // Mock intermediate functions
      const nonce = sinon.stub(api, 'nonce');
      const signerDefault = sinon.stub(signer, 'default');
      const getPrice = sinon.stub(arcadeContract, 'getPrice');
      const pay = sinon.stub(arcadeContract, 'pay');
      const paymentConfirmation = sinon.stub(api, 'paymentConfirmation');
      const getArcadeState = sinon.stub(arcadeContract, 'getArcadeState');
      const challenge = { nonce: '0x01' };
      const signature = '0x01';
      const price = 1;
      const txreceipt = { transactionHash: '0x01' };
      const gameState = 1337;
      const arcadeState = 1337;
      nonce.returns(Promise.resolve(challenge));
      signerDefault.returns(Promise.resolve(signature));
      getPrice.returns(Promise.resolve(price));
      pay.returns(Promise.resolve(txreceipt));
      getArcadeState.returns(Promise.resolve(arcadeState));
      paymentConfirmation.returns(Promise.resolve(gameState));

      // Test
      const output = await endpoints.newGame();
      expect(output).toEqual({ gameState, arcadeState });
      // Restore mocked functions
      nonce.restore();
      signerDefault.restore();
      getPrice.restore();
      pay.restore();
      paymentConfirmation.restore();
      getArcadeState.restore();
    });

    it('should throw NoWeb3Provider with web3 undefined', async () => {
      web3 = sinon.stub(web3Provisioned, 'web3').value(undefined);
      await expect(endpoints.newGame()).rejects.toEqual(exceptions.NoWeb3Provider);
      web3.restore();
    });

    it('should throw WrongNetwork with wrong network', async () => {
      network = sinon.stub(web3Provisioned, 'network').value(31337);
      await expect(endpoints.newGame()).rejects.toEqual(exceptions.WrongNetwork);
      network.restore();
    });
  });

  afterAll(() => {
    web3.restore();
    network.restore();
  });
});
