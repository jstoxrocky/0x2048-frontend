import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureBoard } from '../../../src/components/board/board';
import { initialState } from '../../../src/reducers/game-state-reducer';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const Board = mount(<PureBoard {...initialState} />);
  return Board;
};

describe('Board', () => {
  it('should have 4 Row', () => {
    const Board = setup();
    expect(Board.find('Row').length).toBe(4);
  });

  it('Row should have 4 Tile', () => {
    const Board = setup();
    const Row = Board.find('Row').first();
    expect(Row.find('Tile').length).toBe(4);
  });

  it('Tile should have 1 div', () => {
    const Board = setup();
    const Row = Board.find('Row').first();
    const Tile = Row.find('Tile').first();
    expect(Tile.find('div').length).toBe(1);
  });
});
