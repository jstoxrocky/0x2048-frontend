import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import { PureMove } from '../../../src/components/move/move';
import { initialState } from '../../../src/reducers/game-state-reducer';
import * as MoveBtn from '../../../src/components/move/move-btn';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  MoveBtn.default = MoveBtn.PureMoveBtn;
  MoveBtn.default.propTypes.dispatch = PropTypes.func;
  const props = { ...initialState };
  const enzymeWrapper = mount(<PureMove {...props} />);
  return { enzymeWrapper };
};

describe('pure move', () => {
  it('props should be intial game state', () => {
    const { enzymeWrapper } = setup();
    const moveProps = enzymeWrapper.props();
    expect(moveProps.score).toBe(initialState.score);
  });
});
