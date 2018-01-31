import * as types from './action-types';
import { adjustPrice } from '../package/endpoints';

export default () => ({
  type: types.ADJUST_PRICE,
  payload: adjustPrice(),
});
