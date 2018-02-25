import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getIOU from '../../../actions/get-iou';

class NewGameBtn extends React.Component {
  componentDidMount() {
    this.handleClick.bind(this);
  }

  handleClick(e) {
    // (1) Fetch next IOU from server (GET /iou)
    // (2) Prompt user to sign next IOU
    // (3) Submit IOU (POST /iou)
    // (4) Start new game (POST /move)
    e.preventDefault();
    this.props.dispatch(getIOU());
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
