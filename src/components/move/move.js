import merge from 'lodash/merge';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MoveBtn from './move-btn';
import Board from './board';
import gameState from '../../actions/game-state';

class Move extends React.Component {
  componentDidMount() {
    this.props.dispatch(gameState());
  }

  render() {
    const { score } = this.props;
    return (
      <div className="container">
        <h5>Play</h5>
        <div className="score">
          <h5>Score: {score}</h5>
        </div>
        <Board />
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
  }
}

Move.propTypes = {
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(({ game, dispatch }) => (merge(game, { dispatch })))(Move);
export { Move as PureMove };
