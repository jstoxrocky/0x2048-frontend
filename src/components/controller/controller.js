import React from 'react';
import ControllerBtn from './controller-btn';
import './controller-btn.css';

const Controller = () => (
  <div>
    <div className="row controller-btn-row">
      <div className="col-4 offset-4">
        <ControllerBtn title="U" direction={1} />
      </div>
    </div>
    <div className="row controller-btn-row">
      <div className="col-4">
        <ControllerBtn title="L" direction={3} />
      </div>
      <div className="col-4">
        <ControllerBtn title="D" direction={2} />
      </div>
      <div className="col-4">
        <ControllerBtn title="R" direction={4} />
      </div>
    </div>
  </div>
);

export default Controller;
