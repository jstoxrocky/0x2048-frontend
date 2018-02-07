import Web3 from 'web3';
import ganache from 'ganache-core';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as deployedContract from '../../../src/package/deployed-contract';
import * as test from './test-setup/test-provider';
import { abi, data } from './test-setup/abi';

describe('deployed contract', () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    const provider = ganache.provider(test.options);
    web3Provisioned.web3.setProvider(provider);
    const undeployedContract = new web3Provisioned.web3.eth.Contract(abi, { data });
    const contract = await undeployedContract.deploy().send(test.deploymentOptions);
    contract.setProvider(provider);
    deployedContract.contract = contract;
  });

  it('should have code', async () => {
    const contractCode = await web3Provisioned
      .web3.eth.getCode(deployedContract.contract._address); // eslint-disable-line no-underscore-dangle, max-len
    expect(contractCode).not.toBe('0x0');
  });

  it('owner should be test owner', async () => {
    const contractOwner = await deployedContract.contract.methods.owner().call();
    expect(contractOwner).toBe(test.owner.address);
  });
});
