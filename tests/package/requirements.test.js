import ganache from 'ganache-core';
import Web3 from 'web3';
import * as exceptions from '../../src/package/exceptions';
import * as web3Provisioned from '../../src/package/web3-provisioned';
import * as test from './test-setup/test-provider';
import { web3Provider, accountsAvailable, correctNetwork, connectedToEVM } from '../../src/package/requirements';

// require('events').EventEmitter.defaultMaxListeners = Infinity;

describe('require', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
  });

  it('requireWeb3Provider should succeed with web3 defined', () => {
    const output = web3Provider();
    expect(output).toBe(true);
  });

  it('requireWeb3Provider should throw NoWeb3Provider with web3 undefined', () => {
    web3Provisioned.web3 = undefined;
    expect(web3Provider).toThrowError(exceptions.NoWeb3Provider);
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
  });

  it('requireAccountsAvailable should succeed accounts available', async () => {
    const output = await accountsAvailable();
    expect(output).toBe(true);
  });

  it.skip('requireAccountsAvailable should throw NoAccountsAvailable with no accounts available', async () => {
    // Skipped for now as no way to specify zero accounts create in Ganache
    web3Provisioned.web3.setProvider(ganache.provider({ total_accounts: 0 }));
    await expect(accountsAvailable()).rejects.toEqual(exceptions.NoAccountsAvailable);
  });
});

describe('requireCorrectNetwork', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
  });

  it('should succeed with correct network', async () => {
    web3Provisioned.network = test.network;
    const output = await correctNetwork();
    expect(output).toBe(true);
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
  });

  it('should throw CantFetchNetwork with a web3 provider pointing to non-existant chain', async () => {
    const provider = new Web3.providers.HttpProvider('http://fakehttpprovider.com');
    web3Provisioned.web3.setProvider(provider);
    await expect(correctNetwork()).rejects.toEqual(exceptions.CantFetchNetwork);
  });

  it('should throw WrongNetwork with wrong network', async () => {
    web3Provisioned.web3.setProvider(ganache.provider({ network_id: 31337 }));
    await expect(correctNetwork()).rejects.toEqual(exceptions.WrongNetwork);
  });
});

describe('connectedToEVM', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
  });

  it('should fail from wrong network', async () => {
    web3Provisioned.web3.setProvider(ganache.provider({ network_id: 31337 }));
    await expect(connectedToEVM()).rejects.toEqual(exceptions.WrongNetwork);
  });

  it.skip('should fail from no accounts', async () => {
    web3Provisioned.web3.setProvider(ganache.provider({ total_accounts: 0 }));
    await expect(connectedToEVM()).rejects.toEqual(exceptions.NoAccountsAvailable);
  });

  it('should fail from no web3 provider', async () => {
    web3Provisioned.web3 = undefined;
    await expect(connectedToEVM()).rejects.toEqual(exceptions.NoWeb3Provider);
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
  });

  it('should succeed', async () => {
    const output = await connectedToEVM();
    expect(output).toBe(true);
  });
});
