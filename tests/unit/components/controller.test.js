import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import Controller from '../../../src/components/controller/controller';
import { initialState } from '../../../src/reducers/game-state-reducer';
import * as ControllerBtn from '../../../src/components/controller/controller-btn';

Enzyme.configure({ adapter: new Adapter() });

let renderedController;

describe('controller', () => {
  beforeAll(() => {
    // Get the pure classes
    ControllerBtn.default = ControllerBtn.PureControllerBtn;
    // Mark as not required for this test, otherwise it throws
    ControllerBtn.default.propTypes.dispatch = PropTypes.func;

    const dispatch = jest.fn();
    const props = { ...initialState, dispatch };
    renderedController = shallow(<Controller {...props} />);
  });

  it('should have 4 ControllerBtn', () => {
    expect(renderedController.find('ControllerBtn').length).toBe(4);
  });
});
