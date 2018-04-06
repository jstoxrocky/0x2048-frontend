import React from 'react';
import { merge } from 'lodash';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureMessage } from '../../../src/components/message/message';
import { initialState } from '../../../src/reducers/message-reducer';
import MessageAlert from '../../../src/components/message/message-alert';

Enzyme.configure({ adapter: new Adapter() });

describe('pure message', () => {
  it('props should be intial message state', () => {
    const renderedMessage = mount(<PureMessage {...initialState} />);
    const messageProps = renderedMessage.props();
    expect(messageProps.value).toBe(initialState.value);
    expect(messageProps.visible).toBe(initialState.visible);
    expect(messageProps.level).toBe(initialState.level);
  });

  it('should have 0 MessageAlerts on not visible', () => {
    const renderedMessage = shallow(<PureMessage {...initialState} />);
    expect(renderedMessage.find(MessageAlert).length).toBe(0);
  });

  it('should have 1 MessageAlerts on visible', () => {
    MessageAlert.default = MessageAlert.PureMessageAlert;
    // MessageAlert.default.propTypes.dispatch = PropTypes.func;
    const dispatch = jest.fn();
    const newProps = merge({}, initialState, { dispatch, visible: true });
    const renderedMessage = shallow(<PureMessage {...newProps} />);
    expect(renderedMessage.find(MessageAlert).length).toBe(1);
  });
});
