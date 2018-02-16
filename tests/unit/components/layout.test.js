import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import Layout from '../../../src/components/layout/layout';
import * as Stats from '../../../src/components/stats/stats';
import * as Board from '../../../src/components/board/board';

let renderedLayout;
Enzyme.configure({ adapter: new Adapter() });

describe('layout', () => {
  beforeAll(() => {
    // Get the pure classes
    Stats.default = Stats.PureStats;
    Board.default = Board.PureBoard;

    // Mark as not required for this test, otherwise it throws
    Board.default.propTypes.board = PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number));
    Stats.default.propTypes.isParticipant = PropTypes.bool;
    Stats.default.propTypes.round = PropTypes.number;
    Stats.default.propTypes.price = PropTypes.number;
    Stats.default.propTypes.jackpot = PropTypes.number;
    Stats.default.propTypes.score = PropTypes.number;
    Stats.default.propTypes.dispatch = PropTypes.func;

    renderedLayout = shallow(<Layout />);
  });

  it('should have 1 Stats', () => {
    expect(renderedLayout.find('Stats').length).toBe(1);
  });

  it('should have 1 Controller', () => {
    expect(renderedLayout.find('Controller').length).toBe(1);
  });

  it('should have 1 Board', () => {
    expect(renderedLayout.find('Board').length).toBe(1);
  });
});
