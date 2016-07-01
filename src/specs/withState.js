import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import getDisplayName from '../utils/getDisplayName';

function composeWithState(
  initialState,
  stateName = 'state',
  stateSetterName = 'setState'
) {
  return (ChildComponent) => {
    class WithState extends Component {
      state = {
        ...(typeof initialState === 'function' ? initialState(this.props) : initialState),
      };

      setStateValue = (updateFn, callback) => (
        this.setState((previousState, currentProps) => ({
          ...(typeof updateFn === 'function' ? updateFn(previousState, currentProps) : updateFn),
        }), callback)
      )

      render() {
        const stateProps = {
          [stateName]: this.state,
          [stateSetterName]: this.setStateValue,
        };

        return (
          <ChildComponent {...this.props} {...stateProps} />);
      }
    }

    WithState.displayName = `WithState(${getDisplayName(ChildComponent)})`;
    return hoistNonReactStatic(WithState, ChildComponent);
  };
}

export default composeWithState;
