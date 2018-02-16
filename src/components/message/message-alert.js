import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import hideMessage from '../../actions/hide-message';

class MessageAlert extends React.Component {
  handleClick(e) {
    e.preventDefault();
    this.props.dispatch(hideMessage());
  }

  render() {
    const { level, value } = this.props;
    return (
      <div className="container">
        <div className="row top-buffer">
          <div className={`${level} alert alert-dismissible`} role="alert" >
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={e => this.handleClick(e)}>
              <span aria-hidden="true">
                &times;
              </span>
            </button>
            {value}
          </div>
        </div>
      </div>
    );
  }
}

MessageAlert.propTypes = {
  value: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ dispatch }) => ({ dispatch }))(MessageAlert);
export { MessageAlert as PureMessageAlert };
