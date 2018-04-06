import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Layout from '../../../src/components/layout/layout';
import Stats from '../../../src/components/stats/stats';
import Board from '../../../src/components/board/board';
import Controller from '../../../src/components/controller/controller';

let renderedLayout;
Enzyme.configure({ adapter: new Adapter() });

describe('layout', () => {
  beforeAll(() => {
    renderedLayout = shallow(<Layout />);
  });

  it('should have 1 Stats', () => {
    expect(renderedLayout.find(Stats).length).toBe(1);
  });

  it('should have 1 Controller', () => {
    expect(renderedLayout.find(Controller).length).toBe(1);
  });

  it('should have 1 Board', () => {
    expect(renderedLayout.find(Board).length).toBe(1);
  });
});
