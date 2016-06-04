import compose from './compose';

function composeWithTracker(reactiveFn, L, E, options) {
  const onPropsChange = (props, onData) => {
    let trackerCleanup;
    const handler = Tracker.nonreactive(() => (
      Tracker.autorun(() => {
        trackerCleanup = reactiveFn(props, onData);
      })
    ));

    return () => {
      if (typeof (trackerCleanup) === 'function') {
        trackerCleanup();
      }
      return handler.stop();
    };
  };

  return compose(onPropsChange, L, E, options);
}

export default composeWithTracker;
