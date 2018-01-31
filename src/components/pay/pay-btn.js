import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pay from '../../actions/pay';

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
      <div className="container">
        <form className="form-inline my-1 my-lg-0">
          <button onClick={e => this.handleClick(e)} className="btn btn-outline-success my-2 my-sm-0">Pay</button>
        </form>
      </div>
    );
  }
}

PayBtn.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ dispatch }) => ({ dispatch }))(PayBtn);
export { PayBtn as PurePayBtn };
