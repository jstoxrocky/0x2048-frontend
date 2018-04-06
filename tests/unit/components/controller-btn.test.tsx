import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureControllerBtn } from '../../../src/components/controller/controller-btn';
import * as move from '../../../src/actions/move';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe('pure controller-btn', () => {
  it('should call dispatch and move on button-click', () => {
    const defaultMove = sinon.stub(move, 'default');
    const dispatch = jest.fn();
    const direction = 1;
    const title = 'UP';
    const props = { direction, title, dispatch };
    const wrapper = mount(<PureControllerBtn {...props} />);
    wrapper.find('button').simulate('click');
    expect(props.dispatch.mock.calls.length).toBe(1);
    sinon.assert.calledOnce(defaultMove);
    defaultMove.restore();
  });
});
