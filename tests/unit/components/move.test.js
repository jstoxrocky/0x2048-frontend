import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import { PureMove } from '../../../src/components/move/move';
import { initialState } from '../../../src/reducers/game-state-reducer';
import * as MoveBtn from '../../../src/components/move/move-btn';
import * as Board from '../../../src/components/move/board';
import * as gameState from '../../../src/actions/game-state';

Enzyme.configure({ adapter: new Adapter() });

let Move;

describe('move', () => {
  beforeAll(() => {
    // Get the pure classes
    MoveBtn.default = MoveBtn.PureMoveBtn;
    Board.default = Board.PureBoard;
    // Mark as not required for this test, otherwise it throws
    MoveBtn.default.propTypes.dispatch = PropTypes.func;
    Board.default.propTypes.board = PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number));

    const dispatch = jest.fn();
    const props = { ...initialState, dispatch };
    Move = shallow(<PureMove {...props} />);
  });

  it('should have 4 MoveBtn', () => {
    expect(Move.find('MoveBtn').length).toBe(4);
  });

  it('should have 1 Board', () => {
    expect(Move.find('Board').length).toBe(1);
  });

  it('should have score', () => {
    expect(Move.find('.score').find('h5').length).toBe(1);
  });

  it('should call dispatch and gameState and on componentDidMount', () => {
    gameState.default = jest.fn();
    const dispatch = jest.fn();
    const props = { ...initialState, dispatch };
    shallow(<PureMove {...props} />);
    expect(props.dispatch.mock.calls.length).toBe(1);
    expect(gameState.default.mock.calls.length).toBe(1);
  });
});
