import React from 'react';
import { connect } from 'react-redux';
import move from '../../actions/move';

class ControllerBtn extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: any) {
    e.preventDefault();
    const { direction } = this.props;
    this.props.dispatch(move(direction));
  }

  render() {
    const { title } = this.props;
    return (
      <form className="form-inline my-1 my-lg-0">
        <button onClick={this.handleClick} className="btn btn-outline-info">{title}</button>
      </form>
    );
  }
}

export default connect(({ dispatch }) => ({ dispatch }))(ControllerBtn);
export { ControllerBtn as PureControllerBtn };
