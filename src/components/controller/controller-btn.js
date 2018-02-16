import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import move from '../../actions/move';

class ControllerBtn extends React.Component {
  componentDidMount() {
    this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const { direction } = this.props;
    this.props.dispatch(move(direction));
  }

  render() {
    const { title } = this.props;
    return (
      <form className="form-inline my-1 my-lg-0">
        <button onClick={e => this.handleClick(e)} className="btn btn-outline-info">{title}</button>
      </form>
    );
  }
}

ControllerBtn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  direction: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default connect(({ dispatch }) => ({ dispatch }))(ControllerBtn);
export { ControllerBtn as PureControllerBtn };