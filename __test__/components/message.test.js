import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureMessage } from '../../src/components/message/message';
import { initialState } from '../../src/reducers/message-reducer';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = initialState;
  const enzymeWrapper = mount(<PureMessage {...props} />);
  return { enzymeWrapper };
};

describe('pure message', () => {
  it('props should be intial message state', () => {
    const { enzymeWrapper } = setup();
    const messageProps = enzymeWrapper.props();
    expect(messageProps.value).toBe(initialState.value);
    expect(messageProps.visible).toBe(initialState.visible);
    expect(messageProps.level).toBe(initialState.level);
  });
});
