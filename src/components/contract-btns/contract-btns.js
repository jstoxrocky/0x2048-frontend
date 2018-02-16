import React from 'react';
import Pay from './pay/pay';
import AdjustPrice from './adjust-price/adjust-price';
import UploadScore from './upload-score/upload-score';
import './contract-btn.css';

export default () => (
  <div>
    <div className="row contract-btn-row">
      <div className="col-12">
        <Pay />
      </div>
    </div>
    <div className="row contract-btn-row">
      <div className="col-12">
        <AdjustPrice />
      </div>
    </div>
    <div className="row contract-btn-row">
      <div className="col-12">
        <UploadScore />
      </div>
    </div>
  </div>
);
