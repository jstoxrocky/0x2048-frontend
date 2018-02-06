import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import { PureMove } from '../../../src/components/move/move';
import { initialState } from '../../../src/reducers/game-state-reducer';
import * as MoveBtn from '../../../src/components/move/move-btn';
import * as Board from '../../../src/components/move/board';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  // Get the pure classes
  MoveBtn.default = MoveBtn.PureMoveBtn;
  Board.default = Board.PureBoard;
  // Mark as not required for this test, otherwise it throws
  MoveBtn.default.propTypes.dispatch = PropTypes.func;
  Board.default.propTypes.board = PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number));
  const wrapper = shallow(<PureMove {...initialState} />);
  return wrapper;
};

describe('pure move', () => {
  it('should have 4 MoveBtn', () => {
    const wrapper = setup();
    expect(wrapper.find('MoveBtn').length).toBe(4);
  });

  it('should have 1 Board', () => {
    const wrapper = setup();
    expect(wrapper.find('Board').length).toBe(1);
  });

  it('should have score', () => {
    const wrapper = setup();
    expect(wrapper.find('.score').find('h5').length).toBe(1);
  });
});
