import { merge } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import uploadScore from '../../../actions/upload-score';

class UploadScoreBtn extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: any) {
    e.preventDefault();
    const { signature, recoveredAddress, score } = this.props;
    this.props.dispatch(uploadScore(
      signature.v,
      signature.r,
      signature.s,
      recoveredAddress,
      score,
    ));
  }

  render() {
    return (
      <form className="form-inline">
        <button onClick={this.handleClick} className="btn btn-outline-success">Upload Score</button>
      </form>
    );
  }
}

export default connect(({ game, dispatch }) => (merge(game, { dispatch })))(UploadScoreBtn);
export { UploadScoreBtn as PureUploadScoreBtn };
