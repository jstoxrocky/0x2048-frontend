import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PureBoard, Tile, Row } from '../../../src/components/board/board';
import { initialState } from '../../../src/reducers/game-state-reducer';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const Board = mount(<PureBoard {...initialState} />);
  return Board;
};

describe('Board', () => {
  it('should have 4 Row', () => {
    const board = setup();
    expect(board.find(Row).length).toBe(4);
  });

  it('Row should have 4 Tile', () => {
    const board = setup();
    const row = board.find(Row).first();
    expect(row.find(Tile).length).toBe(4);
  });

  it('Tile should have 1 div', () => {
    const board = setup();
    const row = board.find(Row).first();
    const tile = row.find(Tile).first();
    expect(tile.find('div').length).toBe(1);
  });
});
