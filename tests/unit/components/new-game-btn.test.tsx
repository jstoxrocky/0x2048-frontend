import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureNewGameBtn } from '../../../src/components/btns/new-game/new-game-btn';
import * as newGame from '../../../src/actions/new-game';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe('pure upload-score-btn', () => {
  it('should call dispatch and newGame on button-click', () => {
    const defaultNewGame = sinon.stub(newGame, 'default');
    const dispatch = jest.fn();
    const props = { dispatch };
    const wrapper = mount(<PureNewGameBtn {...props} />);
    wrapper.find('button').simulate('click');
    expect(props.dispatch.mock.calls.length).toBe(1);
    sinon.assert.calledOnce(defaultNewGame);
    defaultNewGame.restore();
  });
});
