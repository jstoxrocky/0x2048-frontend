import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureMessageAlert } from '../../../src/components/message/message-alert';
import * as hideMessage from '../../../src/actions/hide-message';

Enzyme.configure({ adapter: new Adapter() });

describe('pure  message-alert', () => {
  it('should call dispatch and hideMessage on button-click', () => {
    hideMessage.default = jest.fn();
    const value = 'VALUE';
    const level = 'LEVEL';

    const dispatch = jest.fn();
    const props = { dispatch, level, value };
    const wrapper = mount(<PureMessageAlert {...props} />);
    wrapper.find('button').simulate('click');
    expect(props.dispatch.mock.calls.length).toBe(1);
    expect(hideMessage.default.mock.calls.length).toBe(1);
  });
});
