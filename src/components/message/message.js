import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageGroup from './message-group';

const Message = ({ value, visible, level }) => (
  visible ? <MessageGroup value={value} level={level} /> : <div />
);

Message.propTypes = {
  value: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  level: PropTypes.string.isRequired,
};

export default connect(({ message }) => (message))(Message);
export { Message as PureMessage };
