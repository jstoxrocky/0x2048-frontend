import signTypedData from './signTypedData';
import * as deployedContract from '../../src/package/deployed-contract';

const iou = async (user, value) => {
  const msgParams = [
    {
      type: 'string',
      name: 'This signature is for intended for use with 0x2048 at the below Rinkeby address. If you are seeing this message and not interacting with 0x2048, someone may be attempting forge your signature',
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
