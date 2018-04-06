import React from 'react';
import { merge } from 'lodash';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureStats } from '../../../src/components/stats/stats';
import * as arcade from '../../../src/reducers/arcade-state-reducer';
import * as game from '../../../src/reducers/game-state-reducer';
import * as arcadeState from '../../../src/actions/arcade-state';
import * as gameState from '../../../src/actions/game-state';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

let Stats;

describe('stats', () => {
  beforeAll(() => {
    const dispatch = jest.fn();
    const props = merge({}, arcade.initialState, game.initialState, { dispatch });
    Stats = mount(<PureStats {...props} />);
  });

  it('should contain score', () => {
    expect(Stats.find('.score').length).toBe(1);
  });

  it('should contain jackpot', () => {
    expect(Stats.find('.jackpot').length).toBe(1);
  });

  it('should contain highscore', () => {
    expect(Stats.find('.highscore').length).toBe(1);
  });

  it('should contain round', () => {
    expect(Stats.find('.round').length).toBe(1);
  });

  it('should call dispatch and getArcadeState and on componentDidMount', () => {
    const defaultGameState = sinon.stub(gameState, 'default');
    const defaultArcadeState = sinon.stub(arcadeState, 'default');
    const dispatch = jest.fn();
    const props = merge({}, arcade.initialState, game.initialState, { dispatch });
    mount(<PureStats {...props} />);
    expect(props.dispatch.mock.calls.length).toBe(2);
    sinon.assert.calledOnce(defaultGameState);
    sinon.assert.calledOnce(defaultArcadeState);
    defaultGameState.restore();
    defaultArcadeState.restore();
  });

  it('should make big numbers readable', () => {
    expect(PureStats.makeBNDisplayable(996688778391794)).toBe('0.000997');
  });
});
