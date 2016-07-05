# React Komposer Plus

> This is fork of [React Komposer](https://github.com/kadirahq/react-komposer)

Let's compose React containers and feed data into components. Supports both React and React Native.

## Installation

```
npm i --save react-komposer-plus
```

## Basic Usage

```
import ComponentA from 'path/to/ComponentA';
import { PropTypes } from 'react';
import {
  withHandlers,
  getContext,
  withRedux,
  withState,
  withLifecycle,
  composeAll,
} from 'react-komposer-plus';
import { useDeps } from 'mantra-plus';

const mapStateToProps = ({ layout }) => ({
  windowWidth: layout.windowWidth,
  windowHeight: layout.windowHeight,
  windowScrollTop: layout.windowScrollTop,
});

export default composeAll(
  withLifecycle({
    componentWillMount() {
      console.log('component will mount');
    },
    componentDidMount() {
      console.log('component mounted');
    },
  }),
  withHandler({
    handleClickCounter: (props, event) => {
      props.setState({
        counter: props.state + 1,
      });
    },
  }),
  withRedux(mapStateToProps),
  withState({
    counter: 1,
  }),
  getContext({
    parentCtx: PropTypes.object,
  }),
  useDeps()
)(ComponentA);
```

In your functional stateless ComponentA, you can now use props to do your thing! **Please take note that props flow from bottom to top of `composeAll`**.

```
export default const ComponentA = ({
  state,
  setState,
  windowWidth,
  windowHeight,
  windowScrollTop,
  handleClickCounter,
}, context) => {
  return (
    <div>
      <h1>current counter value: {state.counter}</h1>
      <button onClick={handleClickCounter}>Increase counter value</button>

      <h1>Window Information</h1>
      <ul>
        <li>Window Height: {windowHeight}</li>
        <li>Window Width: {windowWidth}</li>
        <li>Window ScrollTop: {windowScrollTop}</li>
      </ul>
    </div>
  );
}
```

## Full APIs

See [here](https://github.com/sammkj/react-komposer-plus/blob/master/docs/api.md)
