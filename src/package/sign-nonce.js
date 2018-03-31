import signTypedData from './sign-typed-data';
import * as deployedContract from '../../src/package/deployed-contracts';

const signNonce = async (user, nonce) => {
  const msgParams = [
    {
      type: 'string',
      name: 'This signature is for intended for use with 0x2048 at the below Rinkeby address. If you are seeing this message and not interacting with 0x2048, someone may be attempting forge your signature',
      value: deployedContract.arcadeAddress,
    },
    {
      type: 'bytes32',
      name: 'nonce',
      value: nonce,
    },
  ];
  const signature = await signTypedData(msgParams, user);
  return signature;
};

export default signNonce;
