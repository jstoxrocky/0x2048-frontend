import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contracts';
import * as baseContract from '../../../src/package/account-contract';
import * as test from '../../testnet-config';
import * as accounts from '../../accounts';
import { accountBytecode } from '../../bytecode';

const sendAsync = request => (
  new Promise((resolve) => {
    web3Provisioned.web3.currentProvider.send(request, (err, result) => {
      resolve(result);
    });
  })
);

describe('base-account-contract', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    const provider = ganache.provider(test.options);
    web3Provisioned.web3.setProvider(provider);
    const undeployedContract = new web3Provisioned.web3.eth.Contract(
      deployedContract.accountABI,
      { data: accountBytecode },
    );
    const contract = await undeployedContract.deploy().send(test.deploymentOptions);
    deployedContract.accountContract = contract;
  });

  it('should have code', async () => {
    const contractCode = await web3Provisioned
      .web3.eth.getCode(deployedContract.accountContract._address); // eslint-disable-line no-underscore-dangle, max-len
    expect(contractCode).not.toBe('0x0');
  });

  it('should have an owner equal to test owner', async () => {
    const contractOwner = await deployedContract.accountContract.methods.owner().call();
    expect(contractOwner).toBe(accounts.owner.address);
  });

  it('should have an initial balance of 0 for account `user`', async () => {
    const expected = 0;
    const output = await baseContract.balanceOf(accounts.user.address);
    expect(output).toBe(expected);
  });

  it('should have an initial timeout of 0 for account `user`', async () => {
    const expected = 0;
    const output = await baseContract.timeoutOf(accounts.user.address);
    expect(output).toBe(expected);
  });

  it('should have an initial nonce of 0 for account `user`', async () => {
    const expected = 0;
    const output = await baseContract.getNonce();
    expect(output).toBe(expected);
  });

  it('should succeed when calling deposit', async () => {
    const expected = '0x01';
    const value = 1000000000000000; // 0.001 ETH
    const { status } = await baseContract.deposit(accounts.user.address, value);
    expect(status).toBe(expected);
  });

  it('should succeed when calling withdraw', async () => {
    // Time travel
    const request = {
      jsonrpc: 2.0,
      method: 'evm_increaseTime',
      params: [60 * 60 * 24 * 7],
      id: 1,
    };
    await sendAsync(request);
    // Test
    const expected = '0x01';
    const { status } = await baseContract.withdraw(accounts.user.address);
    expect(status).toBe(expected);
  });

  afterAll('shutdown', (done) => {
    const provider = web3Provisioned.web3._provider; // eslint-disable-line no-underscore-dangle
    web3Provisioned.web3.setProvider();
    provider.close(done);
  });
});
