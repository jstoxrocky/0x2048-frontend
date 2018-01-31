import * as types from './action-types';
import { uploadScore } from '../package/endpoints';

export default (signature, score) => ({
  type: types.UPLOAD,
  payload: uploadScore(signature, score),
});
