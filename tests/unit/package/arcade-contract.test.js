import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import sinon from 'sinon';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contracts';
import * as contract from '../../../src/package/arcade-contract';
import * as test from '../../testnet-config';
import * as accounts from '../../accounts';
import arcadeBytecode from '../../bytecode';
import * as exceptions from '../../../src/package/exceptions';

describe('base-arcade-contract', () => {
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

  it('owner should be test owner', async () => {
    const contractOwner = await deployedContract.arcadeContract.methods.owner().call();
    expect(contractOwner).toBe(accounts.owner.address);
  });

  it('should have an initial round of 1', async () => {
    const expected = 1;
    const output = await contract.getRound();
    expect(output).toBe(expected);
  });

  it('should have an initial jackpot of 0', async () => {
    const expected = 0;
    const output = await contract.getJackpot();
    expect(output).toBe(expected);
  });

  it('should have an initial highscore of 0', async () => {
    const expected = 0;
    const output = await contract.getHighscore();
    expect(output).toBe(expected);
  });

  it('should have an initial arcade state equal to initial values', async () => {
    const jackpot = 0;
    const round = 1;
    const highscore = 0;
    const expected = { jackpot, round, highscore };
    const output = await contract.getArcadeState();
    expect(output).toEqual(expected);
  });

  it('should succeed when calling pay', async () => {
    const nonce = '0x01';
    const output = await contract
      .pay(accounts.user.address, nonce);
    expect(output).toBe(true);
  });

  it('should succeed when calling upload score', async () => {
    const jackpot = 0;
    const round = 2;
    const highscore = 1;
    const expected = { jackpot, round, highscore };
    const score = 1;
    const v = '0x1c';
    const r = '0x2aaf6d6b8e6084b4b8220b81501da9565661d84dfc85474827d2aeaf47af1428';
    const s = '0x29669f85961770eb3d9ad36e7808ebf3cd616ad717bfb642f805f053a820f3d2';
    const output = await contract
      .uploadScore(v, r, s, accounts.user.address, score);
    expect(output).toEqual(expected);
  });

  it('should fail when calling uploadScore if data not signed by owner', async () => {
    const score = 1;
    const v = '0x1c';
    const r = '0x42c47c4647da1db355a773d8847f4089f6beea98c2e2e2c55ef6af2348589830';
    const s = '0x3941fbca051659c927ceebb6322f7801957688ca457eef480d473ec1010f89a9';
    contract.uploadScore(v, r, s, accounts.user.address, score)
      .catch(e => (expect(e))
        .toEqual(exceptions.TransactionFailure));
  });

  describe('MetaMask', () => {
    beforeEach(() => {
      sinon.stub(contract, 'baseUploadScore');
    });

    afterEach(() => {
      contract.baseUploadScore.restore();
    });

    it('should gracefully handle MetaMask exceptions', async () => {
      contract.baseUploadScore.returns(async () => Promise.reject().catch(() => {}));
      const score = 0;
      const v = '';
      const r = '';
      const s = '';
      await contract.uploadScore(v, r, s, accounts.user.address, score)
        .catch(e => (expect(e))
          .toEqual(exceptions.MetamaskError));
    });
  });

  afterAll('shutdown', (done) => {
    const provider = web3Provisioned.web3._provider; // eslint-disable-line no-underscore-dangle
    web3Provisioned.web3.setProvider();
    provider.close(done);
  });
});
