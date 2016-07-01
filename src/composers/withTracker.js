import compose from '../compose';

function composeWithTracker(reactiveFn, L, E, options = { displayName: 'WithTracker' }) {
  const onPropsChange = (props, onData) => {
    if (!props.context) {
      throw new Error('No context passed as prop.');
    }

    const context = typeof props.context === 'function' ? props.context() : props.context;
    const Tracker = context.Tracker || context.tracker || context.Trackr;

    if (!Tracker) {
      throw new Error('No Tracker found in the context');
    }

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
