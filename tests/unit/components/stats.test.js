import React from 'react';
import merge from 'lodash/merge';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureStats } from '../../../src/components/stats/stats';
import * as arcade from '../../../src/reducers/arcade-state-reducer';
import * as game from '../../../src/reducers/game-state-reducer';
import * as arcadeState from '../../../src/actions/arcade-state';
import * as gameState from '../../../src/actions/game-state';

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

  it('should contain price', () => {
    expect(Stats.find('.price').length).toBe(1);
  });

  it('should contain round', () => {
    expect(Stats.find('.round').length).toBe(1);
  });

  it('should contain isParticipant', () => {
    expect(Stats.find('.isParticipant').length).toBe(1);
  });

  it('should call dispatch and getArcadeState and on componentDidMount', () => {
    arcadeState.default = jest.fn();
    gameState.default = jest.fn();
    const dispatch = jest.fn();
    const props = merge({}, arcade.initialState, game.initialState, { dispatch });
    mount(<PureStats {...props} />);
    expect(props.dispatch.mock.calls.length).toBe(2);
    expect(arcadeState.default.mock.calls.length).toBe(1);
    expect(gameState.default.mock.calls.length).toBe(1);
  });

  it('should make big numbers readable', () => {
    expect(PureStats.makeBNDisplayable(996688778391794)).toBe('0.000997');
  });
});
