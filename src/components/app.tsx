import 'bootstrap/dist/css/bootstrap.min.css'; // tslint:disable-line:no-submodule-imports max-line-length
import React from 'react';
import Message from './message/message';
import Layout from './layout/layout';

export default () => (
  <div>
    <Message />
    <Layout />
  </div>
);
