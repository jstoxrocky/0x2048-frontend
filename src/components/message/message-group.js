import React from 'react';
import PropTypes from 'prop-types';

const MessageGroup = ({ value, level }) => (
  <div className="container">
    <div className="row top-buffer">
      <div className={`${level} alert`} >{value}</div>
    </div>
  </div>
);

MessageGroup.propTypes = {
  value: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
};

export default MessageGroup;
