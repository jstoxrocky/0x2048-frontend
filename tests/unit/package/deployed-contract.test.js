import Web3 from 'web3';
import ganache from 'ganache-core';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as test from './test-setup/test-provider';
import { abi, data } from './test-setup/abi';

describe('deployed contract', () => {
  it('should have code', async () => {
    web3Provisioned.web3 = new Web3();
    const provider = ganache.provider(test.options);
    web3Provisioned.web3.setProvider(provider);
    const undeployedContract = new web3Provisioned.web3.eth.Contract(abi, { data });
    const contract = await undeployedContract.deploy().send(test.deploymentOptions);
    contract.setProvider(provider);
    const contractCode = await web3Provisioned
      .web3.eth.getCode(contract._address); // eslint-disable-line no-underscore-dangle
    expect(contractCode).not.toBe('0x0');
  });
});
