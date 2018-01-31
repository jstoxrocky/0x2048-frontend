import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MoveBtn from './move-btn';

const Move = ({ score }) => (
  <div className="container">
    <h5>Play</h5>
    <h5>Score: {score}</h5>
    <div className="row">
      <div className="col-md-3">
        <MoveBtn title="Up" direction={1} />
      </div>
      <div className="col-md-3">
        <MoveBtn title="Down" direction={2} />
      </div>
      <div className="col-md-3">
        <MoveBtn title="Left" direction={3} />
      </div>
      <div className="col-md-3">
        <MoveBtn title="Right" direction={4} />
      </div>
    </div>
  </div>
);

Move.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(({ game }) => (game))(Move);
export { Move as PureMove };
