import React from 'react';
import omit from 'lodash.omit';
import hoistNonReactStatic from 'hoist-non-react-statics';
import getDisplayName from '../utils/getDisplayName';

function withLifecycle(specs) {
  return (ChildComponent) => {
    const cleanSpecs = omit(specs, ['render']);

    const WithLifecycle = React.createClass({
      ...cleanSpecs,
      render() {
        return (<ChildComponent {...this.props} {...this.state} />);
      },
    });

    WithLifecycle.displayName = `WithLifecycle(${getDisplayName(ChildComponent)})`;
    return hoistNonReactStatic(WithLifecycle, ChildComponent);
  };
}

export default withLifecycle;
