import compose from './compose';
import invariant from 'invariant';

function composeWithObservable(fn, L, E, options = { displayName: 'ObservableContainer' }) {
  const onPropsChange = (props, sendData) => {
    const observable = fn(props);
    invariant(
      typeof observable.subscribe === 'function',
      'Should return an observable from the callback of `composeWithObservable`'
    );

    sendData();
    const onData = data => {
      invariant(
        typeof data === 'object',
        'Should return a plain object from the promise'
      );
      const clonedData = { ...data };
      sendData(null, clonedData);
    };

    const onError = err => {
      sendData(err);
    };

    const sub = observable.subscribe(onData, onError);
    return sub.completed.bind(sub);
  };

  return compose(onPropsChange, L, E, options);
}

export default composeWithObservable;
