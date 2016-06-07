# React Komposer Plus

> This is fork of [React Komposer](https://github.com/kadirahq/react-komposer)

Let's compose React containers and feed data into components. Supports both React and React Native.

## Table of Content

* [Installation](#installation)
* [Using with XXX](#using-with-xxx)
    - [Using with Promises](#using-with-promises)
    - [Using with Meteor](#using-with-meteor)
    - [Using with Rx.js Observables](#using-with-rxjs-observables)
    - [Using with Redux](#using-with-redux)

## Installation

```
npm i --save react-komposer-plus
```

## Using with XXX

### Using with Promises

For this, you can use the `composeWithPromise` instead of `compose`.

```js
import { composeWithPromise } from 'react-komposer-plus'

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

// Render the container
ReactDOM.render(<Clock />, document.getElementById('react-root'));
```

### Using with Meteor

For that you need to use `composeWithTracker` method instead of `compose`. Then you can watch any Reactive data inside that.

```js
import { composeWithTracker } from 'react-komposer-plus';
import PostList from '../components/PostList';

function composer(props, onData) {
  if (Meteor.subscribe('posts').ready()) {
    const posts = Posts.find({}, {sort: {_id: 1}}).fetch();
    onData(null, {posts});
  };
};

export default composeWithTracker(composer)(PostList);
```

In addition to above, you can also return a cleanup function from the composer function. See following example:

```js
import { composeWithTracker } from 'react-komposer-plus';
import PostList from '../components/PostList';

const composerFunction = (props, onData) => {
  // tracker related code
  return () => {console.log('Container disposed!');}
};

// Note the use of composeWithTracker
const Container = composeWithTracker(composerFunction)(PostList);
```

For more information, refer this article: [Using Meteor Data and React with Meteor 1.3](https://voice.kadira.io/using-meteor-data-and-react-with-meteor-1-3-13cb0935dedb)


### Using with Rx.js Observables

```js
import { composeWithObservable } from 'react-komposer-plus'

// Create a component to display Time
const Time = ({time}) => (<div>{time}</div>);

const now = Rx.Observable.interval(1000)
  .map(() => ({time: new Date().toString()}));

// Create the composer function and tell how to fetch data
const composerFunction = (props) => now;

// Compose the container
const Clock = composeWithObservable(composerFunction)(Time);

// Render the container
ReactDOM.render(<Clock />, document.getElementById('react-root'));
```

### Using with Redux

```js
import { composeAll, composeWithRedux } from 'react-komposer-plus';

const mapStateToProps = ({ layout }) => ({
  width: layout.width,
})

const ComposedClock = composeAll(
  composeWithRedux(mapStateToProps),
  useDeps()
)(Clock);

ReactDOM.render(<Clock />, document.getElementById('react'))
```

For now, you must use `composeWithRedux` with `composeAll`.
