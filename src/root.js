import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from './components/app';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.instanceOf(Object).isRequired,
};

export default Root;
