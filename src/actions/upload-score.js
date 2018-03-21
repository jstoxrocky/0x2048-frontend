import * as types from './action-types';
import { uploadScore } from '../package/endpoints';

export default (messageHash, v, r, s, score) => ({
  type: types.UPLOAD,
  payload: uploadScore(messageHash, v, r, s, score),
});
