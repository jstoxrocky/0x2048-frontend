import React from 'react';
import Board from '../board/board';
import Stats from '../stats/stats';
import Controller from '../controller/controller';
import Btns from '../btns/btns';
import './layout.css';

export default () => (
  <div className="container-fluid outer-backdrop">
    <div className="container-fluid inner-backdrop">
      <div className="row">
        <div className="col-2 d-none d-lg-block">
          <Stats />
        </div>
        <div className="col-12 col-lg-8">
          <Board />
        </div>
        <div className="col-2 d-none d-lg-block">
          <Controller />
          <Btns />
        </div>
      </div>
    </div>
  </div>
);
