import * as types from './action-types';
import { getIOU } from '../package/endpoints';

export default () => ({
  type: types.GET_IOU,
  payload: getIOU(),
});
