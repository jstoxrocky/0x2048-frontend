import Web3 from 'web3/packages/web3';
import ganache from 'ganache-core';
import * as web3Provisioned from '../../../src/package/web3-provisioned';
import * as endpoints from '../../../src/package/endpoints';
import * as test from '../../testnet-config';

describe('webserver', async () => {
  beforeAll(async () => {
    web3Provisioned.web3 = new Web3();
    web3Provisioned.web3.setProvider(ganache.provider(test.options));
    web3Provisioned.network = test.network;
  });


  it('new game data should succeed', async () => {
    const { success } = await endpoints.newGame();
    expect(success).toBe(true);
  });
});
