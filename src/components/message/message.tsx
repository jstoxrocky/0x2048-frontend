import React from 'react';
import { connect } from 'react-redux';
import MessageAlert from './message-alert';

const Message = ({ value, visible, level }) => (
  visible ? <MessageAlert value={value} level={level} /> : <div />
);

export default connect(({ message }) => (message))(Message);
export { Message as PureMessage };
