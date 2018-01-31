import { web3, owner } from '../web3-provisioned';
import contractPromise from '../deployed-contract';

export const movePayload = {
  score: 0,
  user: null,
  board: null,
  gameover: true,
};

export const move = (user, direction) => ( // eslint-disable-line no-unused-vars
  Promise.resolve(movePayload)
);

export const price = async (user) => {
  const contract = await contractPromise;
  const testPrice = 20;
  const msg = web3.utils.soliditySha3(
    { type: 'address', value: contract._address }, // eslint-disable-line no-underscore-dangle
    { type: 'address', value: user },
    { type: 'uint256', value: testPrice },
  );
  const signature = web3.eth.accounts.sign(msg, owner.privateKey);
  return Promise.resolve({ signature, price: testPrice });
};

