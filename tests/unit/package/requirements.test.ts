import sinon from 'sinon';
import ganache from 'ganache-core';
import Web3 from 'web3';
import * as exceptions from '../../../src/package/exceptions';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as test from '../../testnet-config';
import {
  web3Provider,
  accountsAvailable,
  correctNetwork,
  connectedToEVM,
} from '../../../src/package/requirements';

let web3;
let network;

describe('require', () => {
  beforeAll(async () => {
    web3 = sinon.stub(web3Provisioned, 'web3').value(new Web3());
    const provider = ganache.provider(test.options);
    web3Provisioned.web3.setProvider(provider);
  });

  it('requireWeb3Provider should succeed with web3 defined', async () => {
    const output = await web3Provider();
    expect(output).toBe(true);
  });

  it('requireWeb3Provider should throw NoWeb3Provider with web3 undefined', async () => {
    web3 = sinon.stub(web3Provisioned, 'web3').value(undefined);
    await expect(web3Provider()).rejects.toEqual(exceptions.NoWeb3Provider);
    web3.restore();
  });

  it('requireAccountsAvailable should succeed accounts available', async () => {
    const output = await accountsAvailable();
    expect(output).toBe(true);
  });

  afterAll(() => {
    web3.restore();
    network.restore();
  });
});

describe('requireCorrectNetwork', () => {
  beforeAll(async () => {
    web3 = sinon.stub(web3Provisioned, 'web3').value(new Web3());
    const provider = ganache.provider(test.options);
    web3Provisioned.web3.setProvider(provider);
  });

  it('should throw WrongNetwork with wrong network', async () => {
    network = sinon.stub(web3Provisioned, 'network').value(31337);
    await expect(correctNetwork()).rejects.toEqual(exceptions.WrongNetwork);
    network.restore();
  });

  it('should throw CantFetchNetwork with a web3 provider pointing to non-existant chain', async () => {
    const fakeProvider = new Web3.providers.HttpProvider('http://fakehttpprovider.com');
    web3 = sinon.stub(web3Provisioned, 'web3').value(new Web3());
    web3Provisioned.web3.setProvider(fakeProvider);
    await expect(correctNetwork()).rejects.toEqual(exceptions.CantFetchNetwork);
    web3.restore();
  });

  it('should succeed with correct network', async () => {
    network = sinon.stub(web3Provisioned, 'network').value(test.network);
    const output = await correctNetwork();
    expect(output).toBe(true);
    network.restore();
  });

  afterAll(() => {
    web3.restore();
  });
});

describe('connectedToEVM', () => {
  beforeAll(async () => {
    web3 = sinon.stub(web3Provisioned, 'web3').value(new Web3());
    const provider = ganache.provider(test.options);
    web3Provisioned.web3.setProvider(provider);
  });

  it('should fail from wrong network', async () => {
    network = sinon.stub(web3Provisioned, 'network').value(31337);
    await expect(connectedToEVM()).rejects.toEqual(exceptions.WrongNetwork);
    network.restore();
  });

  it('should fail from no web3 provider', async () => {
    web3 = sinon.stub(web3Provisioned, 'web3').value(undefined);
    await expect(connectedToEVM()).rejects.toEqual(exceptions.NoWeb3Provider);
    web3.restore();
  });

  it('should succeed with correct network', async () => {
    network = sinon.stub(web3Provisioned, 'network').value(test.network);
    const output = await connectedToEVM();
    expect(output).toBe(true);
    network.restore();
  });

  afterAll(() => {
    web3.restore();
  });
});
