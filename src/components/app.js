import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Home from './home/home';
import Pay from './pay/pay';
import AdjustPrice from './adjust-price/adjust-price';
import Move from './move/move';
import UploadScore from './upload-score/upload-score';
import Message from './message/message';


export default () => (
  <div>
    <Home />
    <Message />
    <Pay />
    <Move />
    <UploadScore />
    <AdjustPrice />
  </div>
);
