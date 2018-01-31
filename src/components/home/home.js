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
      <div className="home container">
        <h1>0x2048</h1>
        <h5>Jackpot: {jackpot} ETH</h5>
        <h5>Price: {price} ETH</h5>
        <h5>Round #: {round}</h5>
        <h5>Is Participant: {isParticipant.toString()}</h5>
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
