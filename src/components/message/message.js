import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageAlert from './message-alert';

const Message = ({ value, visible, level }) => (
  visible ? <MessageAlert value={value} level={level} /> : <div />
);

Message.propTypes = {
  value: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  level: PropTypes.string.isRequired,
};

export default connect(({ message }) => (message))(Message);
export { Message as PureMessage };
