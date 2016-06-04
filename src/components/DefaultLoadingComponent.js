import React from 'react';

const DefaultLoadingComponent = () => {
  const loadingText = 'Loading...';

  if (typeof navigator !== 'undefined') {
    const { Text } = require('react-native');

    return (
      <Text>{loadingText}</Text>
    );
  }

  return (<p>{loadingText}</p>);
};

export default DefaultLoadingComponent;
