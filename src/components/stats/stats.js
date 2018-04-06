import merge from 'lodash/merge';
import React from 'react';
import Web3 from 'web3';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getArcadeState from '../../actions/arcade-state';
import getGameState from '../../actions/game-state';
import './stats.css';

class Stats extends React.Component {
  static makeBNDisplayable(bn) {
    const web3 = new Web3();
    return Number.parseFloat(web3.utils.fromWei(bn.toString())).toPrecision(3);
  }

  componentDidMount() {
    this.props.dispatch(getGameState());
    this.props.dispatch(getArcadeState());
  }

  render() {
    const {
      jackpot, highscore, round, score,
    } = this.props;
    const jackpotDisplay = Stats.makeBNDisplayable(jackpot);
    return (
      <div>
        <h5>0x2048</h5>
        <div className="jackpot">
          <p className="label-text">Jackpot:</p>
          <p className="value-text">{jackpotDisplay} ETH</p>
        </div>
        <div className="highscore">
          <p className="label-text">Highscore:</p>
          <p className="value-text">{highscore}</p>
        </div>
        <div className="round">
          <p className="label-text">Round:</p>
          <p className="value-text">{round}</p>
        </div>
        <div className="score">
          <p className="label-text">Score:</p>
          <p className="value-text">{score}</p>
        </div>
      </div>
    );
  }
}

Stats.propTypes = {
  dispatch: PropTypes.func.isRequired,
  jackpot: PropTypes.number.isRequired,
  highscore: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(({ arcade, game, dispatch }) => (
  merge({}, arcade, game, { dispatch })
))(Stats);
export { Stats as PureStats };
