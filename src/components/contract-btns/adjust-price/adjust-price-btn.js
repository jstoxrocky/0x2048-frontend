import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import adjustPrice from '../../../actions/adjust-price';

class AdjustPriceBtn extends React.Component {
  componentDidMount() {
    this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.dispatch(adjustPrice());
  }

  render() {
    return (
      <form className="form-inline">
        <button onClick={e => this.handleClick(e)} className="btn btn-outline-success">Adjust Price</button>
      </form>
    );
  }
}

AdjustPriceBtn.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ dispatch }) => ({ dispatch }))(AdjustPriceBtn);
export { AdjustPriceBtn as PureAdjustPriceBtn };
