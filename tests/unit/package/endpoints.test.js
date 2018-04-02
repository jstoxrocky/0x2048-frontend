import sinon from 'sinon';
import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import jsonschema from 'jsonschema';
import * as api from '../../../src/package/api';
import * as exceptions from '../../../src/package/exceptions';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as endpoints from '../../../src/package/endpoints';
import * as test from '../../testnet-config';
import * as arcadeContract from '../../../src/package/arcade-contract';
import * as schemas from '../../../src/package/schemas';
import * as signer from '../../../src/package/sign-nonce';

describe('endpoint', async () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
  });

  beforeEach(async () => {
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
    web3Provisioned.network = test.network;
  });

  describe('move', async () => {
    it('should succeed and return something', async () => {
      sinon.stub(api, 'move');
      const expected = 1337;
      api.move.returns(Promise.resolve(expected));
      const output = await endpoints.move();
      expect(output).toEqual(expected);
      api.move.restore();
    });

    it('should send arguments that validate schemas.move to api.move', async () => {
      sinon.stub(api, 'move').callsFake((move) => {
        const validator = new jsonschema.Validator();
        const result = validator.validate(move, schemas.move);
        if (result.errors.length > 0) {
          throw exceptions.ValidationError;
        }
        return true;
      });
      const direction = 1;
      const output = await endpoints.move(direction);
      expect(output).toBe(true);
      api.move.restore();
    });

    it('should throw NoWeb3Provider with web3 undefined', async () => {
      web3Provisioned.web3 = undefined;
      await expect(endpoints.move()).rejects.toEqual(exceptions.NoWeb3Provider);
      web3Provisioned.web3 = new Web3();
      web3Provisioned.web3.setProvider(ganache.provider(test.options));
    });

    it.skip('should throw NoAccountsAvailable with no accounts available', async () => {
      // Skipped for now as no way to specify zero accounts create in Ganache
      const provider = ganache.provider({ total_accounts: 0 });
      web3Provisioned.web3.setProvider(provider);
      await expect(endpoints.move()).rejects.toEqual(exceptions.NoAccountsAvailable);
    });

    it('should throw WrongNetwork with wrong network', async () => {
      const provider = ganache.provider({ network_id: 31337 });
      web3Provisioned.web3.setProvider(provider);
      await expect(endpoints.move()).rejects.toEqual(exceptions.WrongNetwork);
    });
  });

  describe('uploadScore', async () => {
    it('should succeed and return something', async () => {
      sinon.stub(arcadeContract, 'uploadScore');
      const expected = 1337;
      arcadeContract.uploadScore.returns(Promise.resolve(expected));
      const output = await endpoints.uploadScore();
      expect(output).toEqual(expected);
      arcadeContract.uploadScore.restore();
    });

    it('should send arguments that validate schemas.signedScore to arcadeContract.uploadScore', async () => {
      sinon.stub(arcadeContract, 'uploadScore').callsFake((signedScore) => {
        const validator = new jsonschema.Validator();
        const result = validator.validate(signedScore, schemas.signedScore);
        if (result.errors.length > 0) {
          throw exceptions.ValidationError;
        }
        return true;
      });
      const v = '0x00';
      const r = '0x00';
      const s = '0x00';
      const score = 1;
      const output = await endpoints.uploadScore(v, r, s, score);
      expect(output).toBe(true);
      arcadeContract.uploadScore.restore();
    });

    it('should throw NoWeb3Provider with web3 undefined', async () => {
      web3Provisioned.web3 = undefined;
      await expect(endpoints.uploadScore()).rejects.toEqual(exceptions.NoWeb3Provider);
      web3Provisioned.web3 = new Web3();
      web3Provisioned.web3.setProvider(ganache.provider(test.options));
    });

    it.skip('should throw NoAccountsAvailable with no accounts available', async () => {
      // Skipped for now as no way to specify zero accounts create in Ganache
      const provider = ganache.provider({ total_accounts: 0 });
      web3Provisioned.web3.setProvider(provider);
      await expect(endpoints.uploadScore()).rejects.toEqual(exceptions.NoAccountsAvailable);
    });

    it('should throw WrongNetwork with wrong network', async () => {
      const provider = ganache.provider({ network_id: 31337 });
      web3Provisioned.web3.setProvider(provider);
      await expect(endpoints.uploadScore()).rejects.toEqual(exceptions.WrongNetwork);
    });
  });

  describe('gameState', async () => {
    it('should succeed and return something', async () => {
      sinon.stub(api, 'gameState');
      const expected = 1337;
      api.gameState.returns(Promise.resolve(expected));
      const output = await endpoints.gameState();
      expect(output).toEqual(expected);
      api.gameState.restore();
    });
  });

  describe('getArcadeState', async () => {
    it('should succeed and return something', async () => {
      sinon.stub(arcadeContract, 'getArcadeState');
      const expected = 1337;
      arcadeContract.getArcadeState.returns(Promise.resolve(expected));
      const output = await endpoints.getArcadeState();
      expect(output).toEqual(expected);
      arcadeContract.getArcadeState.restore();
    });

    it('should throw NoWeb3Provider with web3 undefined', async () => {
      web3Provisioned.web3 = undefined;
      await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.NoWeb3Provider);
      web3Provisioned.web3 = new Web3();
      web3Provisioned.web3.setProvider(ganache.provider(test.options));
    });

    it.skip('should throw NoAccountsAvailable with no accounts available', async () => {
      // Skipped for now as no way to specify zero accounts create in Ganache
      const provider = ganache.provider({ total_accounts: 0 });
      web3Provisioned.web3.setProvider(provider);
      await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.NoAccountsAvailable);
    });

    it('should throw WrongNetwork with wrong network', async () => {
      const provider = ganache.provider({ network_id: 31337 });
      web3Provisioned.web3.setProvider(provider);
      await expect(endpoints.getArcadeState()).rejects.toEqual(exceptions.WrongNetwork);
    });
  });

  describe('newGame', async () => {
    it('should succeed and return something', async () => {
      sinon.stub(api, 'nonce');
      sinon.stub(signer, 'default');
      sinon.stub(arcadeContract, 'getPrice');
      sinon.stub(arcadeContract, 'pay');
      sinon.stub(api, 'paymentConfirmation');
      sinon.stub(arcadeContract, 'getArcadeState');

      const challenge = { nonce: '0x01' };
      const signature = '0x01';
      const price = 1;
      const txreceipt = { transactionHash: '0x01' };
      const gameState = 1337;
      const arcadeState = 1337;

      api.nonce.returns(Promise.resolve(challenge));
      signer.default.returns(Promise.resolve(signature));
      arcadeContract.getPrice.returns(Promise.resolve(price));
      arcadeContract.pay.returns(Promise.resolve(txreceipt));
      arcadeContract.getArcadeState.returns(Promise.resolve(arcadeState));
      api.paymentConfirmation.returns(Promise.resolve(gameState));

      const output = await endpoints.newGame();
      expect(output).toEqual({ gameState, arcadeState });

      api.nonce.restore();
      signer.default.restore();
      arcadeContract.getPrice.restore();
      arcadeContract.pay.restore();
      api.paymentConfirmation.restore();
      arcadeContract.getArcadeState.restore();
    });

    it('should send arguments that validate schemas.payment to arcadeContract.pay', async () => {
      sinon.stub(api, 'nonce');
      sinon.stub(signer, 'default');
      sinon.stub(arcadeContract, 'getPrice');
      sinon.stub(api, 'paymentConfirmation');
      sinon.stub(arcadeContract, 'getArcadeState');

      const challenge = { nonce: '0x01' };
      const signature = '0x01';
      const price = 1;
      api.nonce.returns(Promise.resolve(challenge));
      signer.default.returns(Promise.resolve(signature));
      arcadeContract.getPrice.returns(Promise.resolve(price));

      sinon.stub(arcadeContract, 'pay').callsFake((payment) => {
        const validator = new jsonschema.Validator();
        const result = validator.validate(payment, schemas.payment);
        if (result.errors.length > 0) {
          throw exceptions.ValidationError;
        }
        return true;
      });

      await endpoints.newGame();

      api.nonce.restore();
      signer.default.restore();
      arcadeContract.getPrice.restore();
      arcadeContract.pay.restore();
      api.paymentConfirmation.restore();
      arcadeContract.getArcadeState.restore();
    });

    it('should send arguments that validate schemas.receipt to api.paymentConfirmation', async () => {
      sinon.stub(api, 'nonce');
      sinon.stub(signer, 'default');
      sinon.stub(arcadeContract, 'pay');
      sinon.stub(arcadeContract, 'getPrice');
      sinon.stub(arcadeContract, 'getArcadeState');

      const challenge = { nonce: '0x01' };
      const signature = '0x01';
      const price = 1;
      const txreceipt = { transactionHash: '0x01' };

      const validator = new jsonschema.Validator();
      const transactionReceiptResult = validator.validate(txreceipt, schemas.transactionReceipt);
      expect(transactionReceiptResult.errors).toHaveLength(0);

      api.nonce.returns(Promise.resolve(challenge));
      signer.default.returns(Promise.resolve(signature));
      arcadeContract.getPrice.returns(Promise.resolve(price));
      arcadeContract.pay.returns(Promise.resolve(txreceipt));

      sinon.stub(api, 'paymentConfirmation').callsFake((receipt) => {
        const receiptResult = validator.validate(receipt, schemas.receipt);
        if (receiptResult.errors.length > 0) {
          throw exceptions.ValidationError;
        }
        return true;
      });

      await endpoints.newGame();

      api.nonce.restore();
      signer.default.restore();
      arcadeContract.getPrice.restore();
      arcadeContract.pay.restore();
      api.paymentConfirmation.restore();
      arcadeContract.getArcadeState.restore();
    });

    it('should throw NoWeb3Provider with web3 undefined', async () => {
      web3Provisioned.web3 = undefined;
      await expect(endpoints.newGame()).rejects.toEqual(exceptions.NoWeb3Provider);
      web3Provisioned.web3 = new Web3();
      web3Provisioned.web3.setProvider(ganache.provider(test.options));
    });

    it.skip('should throw NoAccountsAvailable with no accounts available', async () => {
      // Skipped for now as no way to specify zero accounts create in Ganache
      const provider = ganache.provider({ total_accounts: 0 });
      web3Provisioned.web3.setProvider(provider);
      await expect(endpoints.newGame()).rejects.toEqual(exceptions.NoAccountsAvailable);
    });

    it('should throw WrongNetwork with wrong network', async () => {
      const provider = ganache.provider({ network_id: 31337 });
      web3Provisioned.web3.setProvider(provider);
      await expect(endpoints.newGame()).rejects.toEqual(exceptions.WrongNetwork);
    });
  });

  afterAll('shutdown', (done) => {
    const provider = web3Provisioned.web3._provider; // eslint-disable-line no-underscore-dangle
    web3Provisioned.web3.setProvider();
    provider.close(done);
  });
});
