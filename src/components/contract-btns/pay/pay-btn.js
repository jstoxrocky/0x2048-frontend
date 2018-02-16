import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pay from '../../../actions/pay';

class PayBtn extends React.Component {
  componentDidMount() {
    this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.dispatch(pay());
  }

  render() {
    return (
      <form className="form-inline">
        <button onClick={e => this.handleClick(e)} className="btn btn-outline-success">Pay</button>
      </form>
    );
  }
}

PayBtn.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ dispatch }) => ({ dispatch }))(PayBtn);
export { PayBtn as PurePayBtn };
