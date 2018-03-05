import signTypedData from './signTypedData';
import * as deployedContract from '../../src/package/deployed-contract';

const iou = async (user, value) => {
  const msgParams = [
    {
      type: 'string',
      name: 'Disclaimer',
      value: `This signature is for intended for use with 0x2048 at Rinkeby address ${deployedContract.accountAddress}. If you are not interacting with 0x2048 and seeing this message, someone may be attempting forge your signature.`,
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
