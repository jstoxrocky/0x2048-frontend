import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000/api/v1'; // 'http://webserver0x2048-staging.us-west-2.elasticbeanstalk.com/price';
const withCredentials = true;
const api = axios.create({ withCredentials, baseURL });

api.interceptors.response.use(response => response.data);

export const gameState = () => (
  api.get('/gamestate')
);

export const move = (user, direction) => (
  api.post('/move', { user, direction })
);

export const nonce = () => (
  api.get('/nonce')
);

export const addressConfirmation = signature => (
  api.get('/address-confirmation', {
    params: {
      signature,
    },
  })
);

export const paymentConfirmation = () => (
  api.get('/payment-confirmation')
);
