import ganache from 'ganache-core';
import Web3 from 'web3';
import * as exceptions from '../../src/package/exceptions';

require('events').EventEmitter.defaultMaxListeners = Infinity;

jest.mock('../../src/package/web3-provisioned');

describe('requireWeb3Provider', () => {
  beforeEach(async () => {
    jest.resetModules();
  });

  it('should succeed with web3 defined', () => {
    const { requireWeb3Provider } = require('../../src/package/requirements'); // eslint-disable-line global-require
    const output = requireWeb3Provider();
    expect(output).toBe(true);
  });

  it('should throw NoWeb3Provider with web3 undefined', () => {
    const web3Provisioned = require('../../src/package/web3-provisioned'); // eslint-disable-line global-require
    const { requireWeb3Provider } = require('../../src/package/requirements'); // eslint-disable-line global-require
    web3Provisioned.web3 = undefined;
    expect(requireWeb3Provider).toThrowError(exceptions.NoWeb3Provider);
  });
});

describe('requireAccountsAvailable', () => {
  beforeEach(async () => {
    jest.resetModules();
  });

  it('should succeed accounts available', async () => {
    const { requireAccountsAvailable } = require('../../src/package/requirements'); // eslint-disable-line global-require
    const output = await requireAccountsAvailable();
    expect(output).toBe(true);
  });

  it.skip('should throw NoAccountsAvailable with no accounts available', async () => {
    // Skipped for now as no way to specify zero accounts create in Ganache
    const { web3 } = require('../../src/package/web3-provisioned'); // eslint-disable-line global-require
    const { requireAccountsAvailable } = require('../../src/package/requirements'); // eslint-disable-line global-require
    const provider = ganache.provider({ total_accounts: 0 });
    web3.setProvider(provider);
    await expect(requireAccountsAvailable()).rejects.toEqual(exceptions.NoAccountsAvailable);
  });
});

describe('requireCorrectNetwork', () => {
  beforeEach(async () => {
    jest.resetModules();
  });

  it('should succeed with correct network', async () => {
    const { requireCorrectNetwork } = require('../../src/package/requirements'); // eslint-disable-line global-require
    const output = await requireCorrectNetwork();
    expect(output).toBe(true);
  });

  it('should throw CantFetchNetwork with a web3 provider pointing to non-existant chain', async () => {
    const { web3 } = require('../../src/package/web3-provisioned'); // eslint-disable-line global-require
    const { requireCorrectNetwork } = require('../../src/package/requirements'); // eslint-disable-line global-require
    const provider = new Web3.providers.HttpProvider('http://fakehttpprovider.com');
    web3.setProvider(provider);
    await expect(requireCorrectNetwork()).rejects.toEqual(exceptions.CantFetchNetwork);
  });

  it('should throw WrongNetwork with wrong network', async () => {
    const { web3 } = require('../../src/package/web3-provisioned'); // eslint-disable-line global-require
    const { requireCorrectNetwork } = require('../../src/package/requirements'); // eslint-disable-line global-require
    const provider = ganache.provider({ network_id: 31337 });
    web3.setProvider(provider);
    await expect(requireCorrectNetwork()).rejects.toEqual(exceptions.WrongNetwork);
  });
});

describe('connectedToEVM', () => {
  beforeEach(async () => {
    jest.resetModules();
  });

  it('should fail from wrong network', async () => {
    const { web3 } = require('../../src/package/web3-provisioned'); // eslint-disable-line global-require
    const { connectedToEVM } = require('../../src/package/requirements'); // eslint-disable-line global-require
    const provider = ganache.provider({ network_id: 31337 });
    web3.setProvider(provider);
    await expect(connectedToEVM()).rejects.toEqual(exceptions.WrongNetwork);
  });

  it.skip('should fail from no accounts', async () => {
    const { web3 } = require('../../src/package/web3-provisioned'); // eslint-disable-line global-require
    const { connectedToEVM } = require('../../src/package/requirements'); // eslint-disable-line global-require
    const provider = ganache.provider({ total_accounts: 0 });
    web3.setProvider(provider);
    await expect(connectedToEVM()).rejects.toEqual(exceptions.NoAccountsAvailable);
  });

  it('should fail from no web3 provider', async () => {
    const web3Provisioned = require('../../src/package/web3-provisioned'); // eslint-disable-line global-require
    const { connectedToEVM } = require('../../src/package/requirements'); // eslint-disable-line global-require
    web3Provisioned.web3 = undefined;
    await expect(connectedToEVM()).rejects.toEqual(exceptions.NoWeb3Provider);
  });

  it('should succeed', async () => {
    const { connectedToEVM } = require('../../src/package/requirements'); // eslint-disable-line global-require
    const output = await connectedToEVM();
    expect(output).toBe(true);
  });
});
