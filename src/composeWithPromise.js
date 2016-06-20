import invariant from 'invariant';
import compose from './compose';

function composeWithPromise(fn, L, E, options = { displayName: 'PromiseContainer' }) {
  const onPropsChange = (props, onData) => {
    const promise = fn(props);
    invariant(
      (typeof promise.then === 'function') &&
      (typeof promise.catch === 'function'),
      'Should return a promise from the callback of `composeWithPromise`'
    );

    onData();
    promise
      .then(data => {
        invariant(
          typeof data === 'object',
          'Should return a plain object from the promise'
        );
        const clonedData = { ...data };
        onData(null, clonedData);
      })
      .catch(err => {
        onData(err);
      });
  };

  return compose(onPropsChange, L, E, options);
}

export default composeWithPromise;
