import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PurePayBtn } from '../../../src/components/pay/pay-btn';
import * as pay from '../../../src/actions/pay';

Enzyme.configure({ adapter: new Adapter() });

describe('pure pay-btn', () => {
  it('should call dispatch and pay on button-click', () => {
    pay.default = jest.fn();
    const dispatch = jest.fn();
    const props = { dispatch };
    const wrapper = mount(<PurePayBtn {...props} />);
    wrapper.find('button').simulate('click');
    expect(props.dispatch.mock.calls.length).toBe(1);
    expect(pay.default.mock.calls.length).toBe(1);
  });
});
