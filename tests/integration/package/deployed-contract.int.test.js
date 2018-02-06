import Web3 from 'web3';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import { contract } from '../../../src/package/deployed-contract';

describe('deployed contract', () => {
  it('should have code', async () => {
    web3Provisioned.web3 = new Web3();
    const providerURL = `https://rinkeby.infura.io/${process.env.INFURA_ACCESS_TOKEN}`;
    const provider = new Web3.providers.HttpProvider(providerURL);
    web3Provisioned.web3.setProvider(provider);
    const contractCode = await web3Provisioned
      .web3.eth.getCode(contract._address); // eslint-disable-line no-underscore-dangle
    expect(contractCode).not.toBe('0x0');
  });
});
