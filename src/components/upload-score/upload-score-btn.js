import merge from 'lodash/merge';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uploadScore from '../../actions/upload-score';

class UploadScoreBtn extends React.Component {
  componentDidMount() {
    this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const { signature, score } = this.props;
    this.props.dispatch(uploadScore(signature, score));
  }

  render() {
    return (
      <div className="container">
        <form className="form-inline my-1 my-lg-0">
          <button onClick={e => this.handleClick(e)} className="btn btn-outline-success my-2 my-sm-0">Upload Score</button>
        </form>
      </div>
    );
  }
}

UploadScoreBtn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  signature: PropTypes.shape({
    message: PropTypes.string.isRequired,
    messageHash: PropTypes.string.isRequired,
    v: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    signature: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(({ game, dispatch }) => (merge(game, { dispatch })))(UploadScoreBtn);
export { UploadScoreBtn as PureUploadScoreBtn };
