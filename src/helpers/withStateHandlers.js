import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import getDisplayName from '../utils/getDisplayName';

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

function composeWithStateHandlers(
  handlers,
  stateName = 'state',
  stateSetterName = 'setState',
) {
  return (ChildComponent) => {
    class WithStateHandlers extends Component {
      componentWillReceiveProps() {
        this.cachedHandlers = {};
      }

      cachedHandlers = {};
      currentState = this.props[stateName] || {};
      updateState = this.props[stateSetterName] ||
                    this.props[this.props[`__stateSetterNameFor(${stateName})`]] ||
                    null;

      handlers = mapHandlers(handlers, (createNewState, handlerName) => {
        const cachedHandler = this.cachedHandlers[handlerName];
        if (cachedHandler) {
          return cachedHandler;
        }

        const createHandler = () => {
          const newState = createNewState.call(null, this.currentState, this.props);
          return this.updateState(newState);
        };

        const handler = createHandler;
        this.cachedHandlers[handlerName] = handler;

        if (typeof handler !== 'function') {
          const message = 'withStateHandlers(): Expected a function.';
          throw new Error(message);
        }

        return handler;
      })

      render() {
        return (<ChildComponent {...this.handlers} {...this.props} />);
      }
    }

    WithStateHandlers.displayName = `WithStateHandlers(${getDisplayName(ChildComponent)})`;

    return hoistNonReactStatic(WithStateHandlers, ChildComponent);
  };
}

export default composeWithStateHandlers;
