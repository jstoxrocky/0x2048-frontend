import merge from 'lodash/merge';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getArcadeState from '../../actions/arcade-state';

class Home extends React.Component {
  componentDidMount() {
    this.props.dispatch(getArcadeState());
  }

  render() {
    const {
      jackpot, price, round, isParticipant,
    } = this.props;
    return (
      <div className="container">
        <div className="title">
          <h1>0x2048</h1>
        </div>
        <div className="jackpot">
          <h5>Jackpot: {jackpot} ETH</h5>
        </div>
        <div className="price">
          <h5>Price: {price} ETH</h5>
        </div>
        <div className="round">
          <h5>Round #: {round}</h5>
        </div>
        <div className="isParticipant">
          <h5>Is Participant: {isParticipant.toString()}</h5>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  jackpot: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired,
  isParticipant: PropTypes.bool.isRequired,
};

export default connect(({ arcade, dispatch }) => (merge(arcade, { dispatch })))(Home);
export { Home as PureHome };
