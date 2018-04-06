import { web3 } from './web3-provisioned';
import * as interfaces from './interfaces';

const sendAsync = (data: interfaces.Request): Promise<interfaces.JsonRPCResponse> => (
  new Promise((resolve) => {
    web3.currentProvider.send(data, (err, result) => {
      resolve(result);
    });
  })
);

const signTypedData = async (data: interfaces.MsgParams[], user: string) => {
  const requestData = {
    jsonrpc: '2.0',
    method: 'eth_signTypedData',
    params: [data, user],
    id: 1,
  };
  const response = await sendAsync(requestData);
  return response.result;
};

export default signTypedData;
