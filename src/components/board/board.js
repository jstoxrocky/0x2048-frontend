import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './board.css';

export const Tile = ({ element }) => (
  <div className="col-3 tile border align-items-center">
    <h1>{ element }</h1>
  </div>
);

export const Row = ({ elements }) => {
  const [e1, e2, e3, e4] = elements;
  return (
    <div className="row board-row">
      <Tile element={e1} />
      <Tile element={e2} />
      <Tile element={e3} />
      <Tile element={e4} />
    </div>
  );
};

const Board = ({ board }) => {
  const [r1, r2, r3, r4] = board;
  return (
    <div className="container board border">
      <Row elements={r1} />
      <Row elements={r2} />
      <Row elements={r3} />
      <Row elements={r4} />
    </div>
  );
};

Tile.propTypes = {
  element: PropTypes.number.isRequired,
};

Row.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.number).isRequired,
};

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number).isRequired).isRequired,
};

export default connect(({ game }) => (game))(Board);
export { Board as PureBoard };
