import * as deployedContract from '../../src/package/deployed-contract';
import { web3 } from './web3-provisioned';

const createIOU = async (user, value) => {
  const msg = web3.utils.soliditySha3(
    { type: 'address', value: deployedContract.accountAddress },
    { type: 'address', value: user },
    { type: 'uint256', value },
  );
  const signature = await web3.eth.sign(msg, user);
  const payload = { signature, user, value };
  return payload;
};

export default createIOU;
