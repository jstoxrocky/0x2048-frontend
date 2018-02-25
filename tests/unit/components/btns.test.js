import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Btns from '../../../src/components/btns/btns';

let renderedBtns;
Enzyme.configure({ adapter: new Adapter() });

describe('contract-btns', () => {
  beforeAll(() => {
    renderedBtns = shallow(<Btns />);
  });

  it('should have 1 UploadScore', () => {
    expect(renderedBtns.find('UploadScore').length).toBe(1);
  });

  it('should have 1 NewGame', () => {
    expect(renderedBtns.find('NewGame').length).toBe(1);
  });
});
