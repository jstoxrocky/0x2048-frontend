import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureAdjustPriceBtn } from '../../src/components/adjust-price/adjust-price-btn';
import * as adjustPrice from '../../src/actions/adjust-price';

Enzyme.configure({ adapter: new Adapter() });

describe('pure adjust-price-btn', () => {
  it('should call dispatch and adjust price on button-click', () => {
    adjustPrice.default = jest.fn();
    const dispatch = jest.fn();
    const props = { dispatch };
    const wrapper = mount(<PureAdjustPriceBtn {...props} />);
    wrapper.find('button').simulate('click');
    expect(props.dispatch.mock.calls.length).toBe(1);
    expect(adjustPrice.default.mock.calls.length).toBe(1);
  });
});
