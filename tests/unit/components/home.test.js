import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureHome } from '../../../src/components/home/home';
import { initialState } from '../../../src/reducers/arcade-state-reducer';
import * as arcadeState from '../../../src/actions/arcade-state';

Enzyme.configure({ adapter: new Adapter() });

let Home;

describe('home', () => {
  beforeAll(() => {
    const dispatch = jest.fn();
    const props = { ...initialState, dispatch };
    Home = mount(<PureHome {...props} />);
  });

  it('should contain title', () => {
    expect(Home.find('.title').length).toBe(1);
  });

  it('should contain jackpot', () => {
    expect(Home.find('.jackpot').length).toBe(1);
  });

  it('should contain price', () => {
    expect(Home.find('.price').length).toBe(1);
  });

  it('should contain round', () => {
    expect(Home.find('.round').length).toBe(1);
  });

  it('should contain isParticipant', () => {
    expect(Home.find('.isParticipant').length).toBe(1);
  });

  it('should call dispatch and getArcadeState and on componentDidMount', () => {
    arcadeState.default = jest.fn();
    const dispatch = jest.fn();
    const props = { ...initialState, dispatch };
    mount(<PureHome {...props} />);
    expect(props.dispatch.mock.calls.length).toBe(1);
    expect(arcadeState.default.mock.calls.length).toBe(1);
  });
});
