import React, { PropTypes } from 'react';

const propTypes = {
  error: PropTypes.string,
};

const DefaultErrorComponent = ({ error }) => {
  const textStyle = {
    marginTop: 20,
    color: 'red',
  };

  const formattedError = `${error.message} \n${error.stack}`;
  return (
    <pre style={textStyle}>{formattedError}</pre>
  );
};

DefaultErrorComponent.propTypes = propTypes;

export default DefaultErrorComponent;
