import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureHome } from '../../src/components/home/home';
import { initialState } from '../../src/reducers/arcade-state-reducer';
import * as arcadeState from '../../src/actions/arcade-state';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const dispatch = jest.fn();
  const props = { ...initialState, dispatch };
  const enzymeWrapper = mount(<PureHome {...props} />);
  return { enzymeWrapper };
};

describe('pure home', () => {
  it('props should be intial arcade state', () => {
    const { enzymeWrapper } = setup();
    const homeProps = enzymeWrapper.props();
    expect(homeProps.jackpot).toBe(initialState.jackpot);
    expect(homeProps.price).toBe(initialState.price);
    expect(homeProps.round).toBe(initialState.round);
    expect(homeProps.isParticipant).toBe(initialState.isParticipant);
  });

  it('should call dispatch and getArcadeState on componentDidMount', () => {
    arcadeState.default = jest.fn();
    const dispatch = jest.fn();
    const props = { ...initialState, dispatch };
    mount(<PureHome {...props} />);
    expect(props.dispatch.mock.calls.length).toBe(1);
    expect(arcadeState.default.mock.calls.length).toBe(1);
  });
});
