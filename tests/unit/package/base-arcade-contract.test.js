import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contracts';
import * as baseContract from '../../../src/package/base-arcade-contract';
import * as test from '../../testnet-config';
import * as accounts from '../../accounts';
import { arcadeBytecode } from '../../bytecode';

describe('base-arcade-contract', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    const provider = ganache.provider(test.options);
    web3Provisioned.web3.setProvider(provider);
    const undeployedContract = new web3Provisioned.web3.eth.Contract(
      deployedContract.arcadeABI,
      { data: arcadeBytecode },
    );
    const contract = await undeployedContract.deploy().send(test.deploymentOptions);
    deployedContract.contract = contract;
  });

  it('should have code', async () => {
    const contractCode = await web3Provisioned
      .web3.eth.getCode(deployedContract.contract._address); // eslint-disable-line no-underscore-dangle, max-len
    expect(contractCode).not.toBe('0x0');
  });

  it('owner should be test owner', async () => {
    const contractOwner = await deployedContract.contract.methods.owner().call();
    expect(contractOwner).toBe(accounts.owner.address);
  });

  it('should have an initial round of 1', async () => {
    const expected = 1;
    const output = await baseContract.getRound();
    expect(output).toBe(expected);
  });

  it('should have an initial jackpot of 0', async () => {
    const expected = 0;
    const output = await baseContract.getJackpot();
    expect(output).toBe(expected);
  });

  it('should have an initial highscore of 0', async () => {
    const expected = 0;
    const output = await baseContract.getHighscore();
    expect(output).toBe(expected);
  });

  it('should succeed when calling upload score', async () => {
    const expected = '0x01';
    const score = 1;
    const messageHash = '0xa2b3fa66f50925b9648e1f4a0ab934a76c2d5d99f0fbdf5e7293b153a08516b2';
    const v = '0x1c';
    const r = '0x2aaf6d6b8e6084b4b8220b81501da9565661d84dfc85474827d2aeaf47af1428';
    const s = '0x29669f85961770eb3d9ad36e7808ebf3cd616ad717bfb642f805f053a820f3d2';
    const { status } = await baseContract
      .uploadScore(messageHash, v, r, s, accounts.user.address, score);
    expect(status).toBe(expected);
  });

  afterAll('shutdown', (done) => {
    const provider = web3Provisioned.web3._provider; // eslint-disable-line no-underscore-dangle
    web3Provisioned.web3.setProvider();
    provider.close(done);
  });
});
