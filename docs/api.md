# React Komposer Plus APIs

## Table of Content

* **General**
  * [`compose`](#compose)
  * [`composeAll`](#composeAll)

* **Component Specs and Lifecycle**
  * [`withContext`](#withContext)
  * [`getContext`](#getContext)
  * [`withHandlers`](#withHandlers)
  * [`withState`](#withState)
  * [`withLifecycle`](withLifecycle)

* **Other integrations**
  * [`withRedux`](#withRedux)
  * [`withTracker`](#withTracker)
  * [`withPromise`](#withPromise)
  * [`withObservable`](#withObservable)

### `compose`

```
import { compose } from 'react-komposer-plus';
import PostList from '../components/PostList';

const composerFunction = (props, onData) => {
  return () => {console.log('Container disposed!');}
};

// Note the use of composeWithTracker
const Container = compose(composerFunction)(PostList);
```

### `composeAll`

```
import {
  composeAll,
  withRedux,
  withState,
} from 'react-komposer-plus';

const ComposedClock = composeAll(
  withRedux(mapStateToProps),
  withState({
    counter: 1,
    counterA: 1,
    counterB: 3,
  }),
)(Counter);
```

### `withContext`

### `getContext`

```
import { getContext } from 'react-komposer-plus';
import { PropTypes } from 'react';

const ComposedClock = getContext({
  time: PropTypes.string,
})(Clock);
```

### `withHandlers`

```
import { withHandlers } from 'react-komposer-plus';

const Clock = ({ handleClick }) => (
  <button onClick={handleClick}>Clock</button>
);

const ComposedClock = withHandlers({
  handleClick: (props, event) {
    console.log(props);
    console.log(event);
  },
})(Clock);
```

### `withState`

```
import { withState } from 'react-komposer-plus';

const Counter = ({ state }) => (
  <div>{state.counter}</div>  // displays 1
);

const ComposedCounter = withState({
  counter: 1,
})(Counter);
```

### `withLifecycle`

```
import { withLifecycle } from 'react-komposer-plus';

const ComposedCounter = withLifecycle({
  componentWillMount() {
    console.log('component will mount');
  },
  componentDidMount() {
    console.log('component mounted');
  },
})(Counter);
```

### `withRedux`

```
import { withRedux } from 'react-komposer-plus';

// clock is from reducer
const mapStateToProps = ({ clock }) => ({
  time: clock.time,
})

const ComposedClock = composeWithRedux(mapStateToProps)(Clock);
```

### `withTracker`

```
import { withTracker } from 'react-komposer-plus';
import PostList from '../components/PostList';

const composerFunction = (props, onData) => {
  // tracker related code
  return () => {console.log('Container disposed!');}
};

// Note the use of composeWithTracker
const Container = composeWithTracker(composerFunction)(PostList);
```

### `withPromise`

```
import { withPromise } from 'react-komposer-plus'

// Create a component to display Time
const Time = ({time}) => (<div>{time}</div>);

// Assume this get's the time from the Server
const getServerTime = () => {
  return new Promise((resolve) => {
    const time = new Date().toString();
    setTimeout(() => resolve({time}), 2000);
  });
};

// Create the composer function and tell how to fetch data
const composerFunction = (props) => {
  return getServerTime();
};

// Compose the container
const Clock = composeWithPromise(composerFunction)(Time, Loading);
```

### `withObservable`

```
import { withObservable } from 'react-komposer-plus'

// Create a component to display Time
const Time = ({time}) => (<div>{time}</div>);

const now = Rx.Observable.interval(1000)
  .map(() => ({time: new Date().toString()}));

// Create the composer function and tell how to fetch data
const composerFunction = (props) => now;

// Compose the container
const Clock = composeWithObservable(composerFunction)(Time);
```
