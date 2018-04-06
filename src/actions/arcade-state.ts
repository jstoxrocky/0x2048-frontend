import * as types from './action-types';
import { getArcadeState } from '../package/endpoints';

export default () => ({
  type: types.GET_ARCADE_STATE,
  payload: getArcadeState(),
});
