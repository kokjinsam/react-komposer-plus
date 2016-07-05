import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import getDisplayName from '../utils/getDisplayName';

function composeWithContext(childContextTypes, getChildContext) {
  return (ChildComponent) => {
    class WithContext extends Component {
      getChildContext() {
        getChildContext(this.props);
      }

      render() {
        return (<ChildComponent {...this.context} {...this.props} />);
      }
    }

    WithContext.childContextTypes = childContextTypes;
    WithContext.displayName = `WithContext(${getDisplayName(ChildComponent)})`;

    return hoistNonReactStatic(WithContext, ChildComponent);
  };
}

export default composeWithContext;
