import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureNewGameBtn } from '../../../src/components/btns/new-game/new-game-btn';
import * as getIOU from '../../../src/actions/get-iou';

Enzyme.configure({ adapter: new Adapter() });

describe('pure upload-score-btn', () => {
  it('should call dispatch and getIOU on button-click', () => {
    getIOU.default = jest.fn();
    const dispatch = jest.fn();
    const props = { dispatch };
    const wrapper = mount(<PureNewGameBtn {...props} />);
    wrapper.find('button').simulate('click');
    expect(props.dispatch.mock.calls.length).toBe(1);
    expect(getIOU.default.mock.calls.length).toBe(1);
  });
});
