import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import getDisplayName from '../utils/getDisplayName';

function composeGetContext(contextTypes) {
  return (ChildComponent) => {
    class GetContext extends Component {
      render() {
        return (<ChildComponent {...this.context} {...this.props} />);
      }
    }

    GetContext.contextTypes = contextTypes;
    GetContext.displayName = `GetContext(${getDisplayName(ChildComponent)})`;
    return hoistNonReactStatic(GetContext, ChildComponent);
  };
}

export default composeGetContext;
