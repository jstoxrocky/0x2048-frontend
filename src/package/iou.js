import signTypedData from './signTypedData';
import * as deployedContract from '../../src/package/deployed-contract';

const iou = async (user, value) => {
  const msgParams = [
    {
      type: 'address',
      name: 'destination',
      value: deployedContract.accountAddress,
    },
    {
      type: 'address',
      name: 'user',
      value: user,
    },
    {
      type: 'uint256',
      name: 'value',
      value,
    },
  ];
  const signature = await signTypedData(msgParams, user);
  const payload = { signature, user, value };
  return payload;
};

export default iou;
