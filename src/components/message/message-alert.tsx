import React from 'react';
import { connect } from 'react-redux';
import hideMessage from '../../actions/hide-message';

class MessageAlert extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: any) {
    e.preventDefault();
    this.props.dispatch(hideMessage());
  }

  render() {
    const { level, value } = this.props;
    return (
      <div className="container">
        <div className="row top-buffer">
          <div className={`${level} alert alert-dismissible`} role="alert" >
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleClick}>
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

export default connect(({ dispatch }) => ({ dispatch }))(MessageAlert);
export { MessageAlert as PureMessageAlert };
