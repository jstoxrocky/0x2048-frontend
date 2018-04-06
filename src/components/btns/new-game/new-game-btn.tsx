import React from 'react';
import { connect } from 'react-redux';
import newGame from '../../../actions/new-game';

class NewGameBtn extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: any) {
    e.preventDefault();
    this.props.dispatch(newGame());
  }

  render() {
    return (
      <form className="form-inline">
        <button onClick={this.handleClick} className="btn btn-outline-success">
          New Game
        </button>
      </form>
    );
  }
}

export default connect(({ dispatch }) => ({ dispatch }))(NewGameBtn);
export { NewGameBtn as PureNewGameBtn };
