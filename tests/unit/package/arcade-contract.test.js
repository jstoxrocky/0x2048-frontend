import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import sinon from 'sinon';
import jsonschema from 'jsonschema';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contracts';
import * as contract from '../../../src/package/arcade-contract';
import * as test from '../../testnet-config';
import * as accounts from '../../accounts';
import arcadeBytecode from '../../bytecode';
import * as exceptions from '../../../src/package/exceptions';
import * as schemas from '../../../src/package/schemas';

describe('arcadeContract', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    const provider = ganache.provider(test.options);
    web3Provisioned.web3.setProvider(provider);
    const undeployedContract = new web3Provisioned.web3.eth.Contract(
      deployedContract.arcadeABI,
      { data: arcadeBytecode },
    );
    const arcadeContract = await undeployedContract.deploy().send(test.deploymentOptions);
    deployedContract.arcadeContract = arcadeContract;
  });

  it('should have code', async () => {
    const contractCode = await web3Provisioned
      .web3.eth.getCode(deployedContract.arcadeContract._address); // eslint-disable-line no-underscore-dangle, max-len
    expect(contractCode).not.toBe('0x0');
  });

  describe('state variables', async () => {
    it('should have an owner equal to test owner', async () => {
      const contractOwner = await deployedContract.arcadeContract.methods.owner().call();
      expect(contractOwner).toBe(accounts.owner.address);
    });

    it('should have an initial round equal to 1', async () => {
      const expected = 1;
      const output = await contract.getRound();
      expect(output).toBe(expected);
    });

    it('should have an initial jackpot equal to 0', async () => {
      const expected = 0;
      const output = await contract.getJackpot();
      expect(output).toBe(expected);
    });

    it('should have an initial highscore equal to 0', async () => {
      const expected = 0;
      const output = await contract.getHighscore();
      expect(output).toBe(expected);
    });

    it('should have a price equal to 1000000000000000 (0.001 ETH)', async () => {
      const expected = 1000000000000000;
      const output = await contract.getPrice();
      expect(output).toBe(expected);
    });
  });

  describe('getArcadeState', async () => {
    it('should validate schemas.arcadeState and be equal to initial values', async () => {
      const jackpot = 0;
      const round = 1;
      const highscore = 0;
      const expected = { jackpot, round, highscore };

      const output = await contract.getArcadeState();

      const validator = new jsonschema.Validator();
      const arcadeStateResult = validator.validate(output, schemas.arcadeState);
      expect(arcadeStateResult.errors).toHaveLength(0);
      expect(output).toEqual(expected);
    });
  });

  describe('pay', async () => {
    it('should receive arguments that validate schemas.payment and return values that validate schemas.transactionReceipt', async () => {
      const nonce = '0x01';
      const user = accounts.user.address;
      const price = await contract.getPrice();
      const payment = { user, price, nonce };

      const validator = new jsonschema.Validator();
      const paymentResult = validator.validate(payment, schemas.payment);
      expect(paymentResult.errors).toHaveLength(0);

      const output = await contract
        .pay(payment);

      const transactionReceiptResult = validator.validate(output, schemas.transactionReceipt);
      expect(transactionReceiptResult.errors).toHaveLength(0);
    });

    it('should gracefully handle MetaMask exceptions', async () => {
      sinon.stub(contract, 'basePay');
      contract.basePay.returns(async () => Promise.reject().catch(() => {}));
      const nonce = '0x01';
      const user = accounts.user.address;
      const price = await contract.getPrice();
      const payment = { user, price, nonce };
      await contract.pay(payment)
        .catch(e => (expect(e))
          .toEqual(exceptions.MetamaskError));
      contract.basePay.restore();
    });
  });

  describe('uploadScore', async () => {
    it('should receive arguments that validate schemas.signedScore and return values that validate schemas.arcadeState', async () => {
      const jackpot = 0;
      const round = 2;
      const highscore = 1;
      const expected = { jackpot, round, highscore };
      const score = 1;
      const user = accounts.user.address;
      const v = '0x1c';
      const r = '0x2aaf6d6b8e6084b4b8220b81501da9565661d84dfc85474827d2aeaf47af1428';
      const s = '0x29669f85961770eb3d9ad36e7808ebf3cd616ad717bfb642f805f053a820f3d2';

      const signedScore = {
        v, r, s, score, user,
      };
      const validator = new jsonschema.Validator();
      const result = validator.validate(signedScore, schemas.signedScore);
      expect(result.errors).toHaveLength(0);

      const output = await contract
        .uploadScore(signedScore);

      const arcadeStateResult = validator.validate(output, schemas.arcadeState);
      expect(arcadeStateResult.errors).toHaveLength(0);
      expect(output).toEqual(expected);
    });

    it('should fail if data not signed by owner', async () => {
      const score = 1;
      const user = accounts.user.address;
      const v = '0x1c';
      const r = '0x42c47c4647da1db355a773d8847f4089f6beea98c2e2e2c55ef6af2348589830';
      const s = '0x3941fbca051659c927ceebb6322f7801957688ca457eef480d473ec1010f89a9';
      const signedScore = {
        v, r, s, score, user,
      };
      contract.uploadScore(signedScore)
        .catch(e => (expect(e))
          .toEqual(exceptions.TransactionFailure));
    });

    it('should gracefully handle MetaMask exceptions', async () => {
      sinon.stub(contract, 'baseUploadScore');
      contract.baseUploadScore.returns(async () => Promise.reject().catch(() => {}));
      const score = 0;
      const user = accounts.user.address;
      const v = '';
      const r = '';
      const s = '';
      const signedScore = {
        v, r, s, score, user,
      };
      await contract.uploadScore(signedScore)
        .catch(e => (expect(e))
          .toEqual(exceptions.MetamaskError));
      contract.baseUploadScore.restore();
    });
  });

  afterAll('shutdown', (done) => {
    const provider = web3Provisioned.web3._provider; // eslint-disable-line no-underscore-dangle
    web3Provisioned.web3.setProvider();
    provider.close(done);
  });
});
