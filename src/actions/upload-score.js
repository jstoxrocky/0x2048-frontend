import * as types from './action-types';
import { uploadScore } from '../package/endpoints';

export default (v, r, s, recoveredAddress, score) => ({
  type: types.UPLOAD,
  payload: uploadScore(v, r, s, recoveredAddress, score),
});
