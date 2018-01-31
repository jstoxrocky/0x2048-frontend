import * as types from './action-types';
import { pay } from '../package/endpoints';

export default () => ({
  type: types.PAY,
  payload: pay(),
});
