import Web3 from 'web3';
import ganache from 'ganache-core';
import sinon from 'sinon';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contracts';
import * as arcadeContract from '../../../src/package/arcade-contract';
import * as baseContract from '../../../src/package/base-contract';
import * as test from '../../testnet-config';
import * as accounts from '../../accounts';
import arcadeBytecode from '../../bytecode';
import * as exceptions from '../../../src/package/exceptions';

let web3stub;
let contractStub;

describe('arcadeContract', () => {
  beforeAll(async () => {
    web3stub = sinon.stub(web3Provisioned, 'web3').value(new Web3());
    const provider = ganache.provider(test.options);
    web3Provisioned.web3.setProvider(provider);

    const undeployedContract = new web3Provisioned.web3.eth.Contract(
      deployedContract.arcadeABI,
    );
    const testnetDeployedContract = await undeployedContract
      .deploy({data: arcadeBytecode, arguments: []})
      .send(test.deploymentOptions);
    contractStub = sinon.stub(deployedContract, 'arcadeContract').value(testnetDeployedContract);
  });

  it('should have code', async () => {
    const contractCode = await web3Provisioned
      .web3.eth.getCode(deployedContract.arcadeContract.options.address);
    expect(contractCode).not.toBe('0x0');
  });

  describe('state variables', async () => {
    it('should have an owner equal to test owner', async () => {
      const contractOwner = await deployedContract.arcadeContract.methods.owner().call();
      expect(contractOwner).toBe(accounts.owner.address);
    });

    it('should have an initial round equal to 1', async () => {
      const expected = 1;
      const output = await arcadeContract.getRound();
      expect(output).toBe(expected);
    });

    it('should have an initial jackpot equal to 0', async () => {
      const expected = 0;
      const output = await arcadeContract.getJackpot();
      expect(output).toBe(expected);
    });

    it('should have an initial highscore equal to 0', async () => {
      const expected = 0;
      const output = await arcadeContract.getHighscore();
      expect(output).toBe(expected);
    });

    it('should have a price equal to 1000000000000000 (0.001 ETH)', async () => {
      const expected = 1000000000000000;
      const output = await arcadeContract.getPrice();
      expect(output).toBe(expected);
    });
  });

  describe('getArcadeState', async () => {
    it('should validate schemas.arcadeState and be equal to initial values', async () => {
      const jackpot = 0;
      const round = 1;
      const highscore = 0;
      const expected = { jackpot, round, highscore };
      const output = await arcadeContract.getArcadeState();
      expect(output).toEqual(expected);
    });
  });

  describe('pay', async () => {
    it('should succeed', async () => {
      const nonce = '0x01';
      const user = accounts.user.address;
      const price = await arcadeContract.getPrice();
      const challenge = { nonce };
      const output = await arcadeContract
        .pay(challenge, user, price);
      expect(output.status).toBe('0x01');
    });

    it('should gracefully handle MetaMask exceptions', async () => {
      const basePay = sinon.stub(baseContract, 'basePay');
      basePay.throws(Error);
      const nonce = '0x01';
      const user = accounts.user.address;
      const price = await arcadeContract.getPrice();
      const challenge = { nonce };
      await expect(arcadeContract.pay(challenge, user, price)).rejects.toEqual(exceptions.MetamaskError);
      basePay.restore();
    });
  });

  describe('uploadScore', async () => {
    it('should succeed', async () => {
      const jackpot = 0;
      const round = 2;
      const highscore = 1;
      const expected = { jackpot, round, highscore };
      const score = 1;
      const recoveredAddress = accounts.user.address;
      const user = accounts.user.address;
      const v = '0x1c';
      const r = '0x2aaf6d6b8e6084b4b8220b81501da9565661d84dfc85474827d2aeaf47af1428';
      const s = '0x29669f85961770eb3d9ad36e7808ebf3cd616ad717bfb642f805f053a820f3d2';

      const signedScore = {
        v, r, s, score, recoveredAddress,
      };
      const output = await arcadeContract
        .uploadScore(signedScore, user);
      expect(output).toEqual(expected);
    });

    it('should fail if data not signed by owner', async () => {
      const score = 1;
      const recoveredAddress = accounts.user.address;
      const user = accounts.user.address;
      const v = '0x1c';
      const r = '0x42c47c4647da1db355a773d8847f4089f6beea98c2e2e2c55ef6af2348589830';
      const s = '0x3941fbca051659c927ceebb6322f7801957688ca457eef480d473ec1010f89a9';
      const signedScore = {
        v, r, s, score, recoveredAddress,
      };
      await expect(arcadeContract.uploadScore(signedScore, user)).rejects.toEqual(exceptions.TransactionFailure);
    });

    it('should gracefully handle MetaMask exceptions', async () => {
      const baseUploadScore = sinon.stub(baseContract, 'baseUploadScore');
      baseUploadScore.throws(Error);
      const score = 0;
      const recoveredAddress = accounts.user.address;
      const user = accounts.user.address;
      const v = '';
      const r = '';
      const s = '';
      const signedScore = {
        v, r, s, score, recoveredAddress,
      };
      await expect(arcadeContract.uploadScore(signedScore, user)).rejects.toEqual(exceptions.MetamaskError);
      baseUploadScore.restore();
    });
  });

  afterAll(() => {
    web3stub.restore();
    contractStub.restore();
  });
});
