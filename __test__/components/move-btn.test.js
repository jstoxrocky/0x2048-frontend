import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureMoveBtn } from '../../src/components/move/move-btn';
import * as move from '../../src/actions/move';

Enzyme.configure({ adapter: new Adapter() });

describe('pure move-btn', () => {
  it('should call dispatch and move on button-click', () => {
    move.default = jest.fn();
    const dispatch = jest.fn();
    const direction = 1;
    const title = 'UP';
    const props = { direction, title, dispatch };
    const wrapper = mount(<PureMoveBtn {...props} />);
    wrapper.find('button').simulate('click');
    expect(props.dispatch.mock.calls.length).toBe(1);
    expect(move.default.mock.calls.length).toBe(1);
  });
});
