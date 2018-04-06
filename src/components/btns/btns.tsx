import React from 'react';
import UploadScore from './upload-score/upload-score';
import NewGame from './new-game/new-game';
import './btn.css';

export default () => (
  <div>
    <div className="row contract-btn-row">
      <div className="col-12">
        <UploadScore />
        <NewGame />
      </div>
    </div>
  </div>
);
