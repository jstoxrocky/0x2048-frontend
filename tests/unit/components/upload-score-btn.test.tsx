import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureUploadScoreBtn } from '../../../src/components/btns/upload-score/upload-score-btn';
import * as uploadScore from '../../../src/actions/upload-score';
import { initialState } from '../../../src/reducers/game-state-reducer';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe('pure upload-score-btn', () => {
  it('should call dispatch and uploadScore on button-click', () => {
    const defaultUploadScore = sinon.stub(uploadScore, 'default');
    const dispatch = jest.fn();
    const props = { ...initialState, dispatch };
    const wrapper = mount(<PureUploadScoreBtn {...props} />);
    wrapper.find('button').simulate('click');
    expect(props.dispatch.mock.calls.length).toBe(1);
    sinon.assert.calledOnce(defaultUploadScore);
    defaultUploadScore.restore();
  });
});
