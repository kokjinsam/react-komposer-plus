import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import getDisplayName from './getDisplayName';

const mapHandlers = (handlers, func) => {
  const result = {};

  /* eslint-disable no-restricted-syntax */
  for (const key in handlers) {
    if (handlers.hasOwnProperty(key)) {
      result[key] = func(handlers[key], key);
    }
  }

  return result;
};

function composeWithHandlers(handlers) {
  return (ChildComponent) => {
    class WithHandlers extends Component {
      componentWillReceiveProps() {
        this.cachedHandlers = {};
      }

      cachedHandlers = {};

      handlers = mapHandlers(handlers, (createHandler, handlerName) => (...args) => {
        const cachedHandler = this.cachedHandlers[handlerName];
        if (cachedHandler) {
          return cachedHandler(...args);
        }

        const handler = createHandler(this.props);
        this.cachedHandlers[handlerName] = handler;

        if (typeof handler !== 'function') {
          const message = 'withHandlers(): Expected a function.';
          throw new Error(message);
        }

        return handler(...args);
      })

      render() {
        return (<ChildComponent {...this.handlers} {...this.props} />);
      }
    }

    WithHandlers.displayName = `WithHandlers(${getDisplayName(ChildComponent)})`;

    return hoistNonReactStatic(WithHandlers, ChildComponent);
  };
}

export default composeWithHandlers;
