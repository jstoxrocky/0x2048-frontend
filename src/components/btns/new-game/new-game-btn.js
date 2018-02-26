import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import newGame from '../../../actions/new-game';

class NewGameBtn extends React.Component {
  componentDidMount() {
    this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.dispatch(newGame());
  }

  render() {
    return (
      <form className="form-inline">
        <button onClick={e => this.handleClick(e)} className="btn btn-outline-success">
          New Game
        </button>
      </form>
    );
  }
}

NewGameBtn.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ dispatch }) => ({ dispatch }))(NewGameBtn);
export { NewGameBtn as PureNewGameBtn };
