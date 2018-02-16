import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ContractBtns from '../../../src/components/contract-btns/contract-btns';

let renderedContractBtns;
Enzyme.configure({ adapter: new Adapter() });

describe('contract-btns', () => {
  beforeAll(() => {
    renderedContractBtns = shallow(<ContractBtns />);
  });

  it('should have 1 Pay', () => {
    expect(renderedContractBtns.find('Pay').length).toBe(1);
  });

  it('should have 1 AdjustPrice', () => {
    expect(renderedContractBtns.find('AdjustPrice').length).toBe(1);
  });

  it('should have 1 UploadScore', () => {
    expect(renderedContractBtns.find('UploadScore').length).toBe(1);
  });
});
