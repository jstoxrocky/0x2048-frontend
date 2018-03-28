import { web3 } from './web3-provisioned';

const sendAsync = request => (
  new Promise((resolve) => {
    web3.currentProvider.send(request, (err, result) => {
      resolve(result);
    });
  })
);

const signTypedData = async (msgParams, user) => {
  const request = {
    jsonrpc: 2.0,
    method: 'eth_signTypedData',
    params: [msgParams, user],
    id: 1,
  };
  const { result } = await sendAsync(request);
  return result;
};

export default signTypedData;
