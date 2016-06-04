// utility function to compose multiple composers at once.
function composeAll(...composers) {
  return function buildFinalComponent(BaseComponent) {
    /*
    if (disableMode) {
      return DummyComponent;
    }
    */

    if (BaseComponent === null || BaseComponent === undefined) {
      throw new Error('Curry function of composeAll needs an input.');
    }

    let finalComponent = BaseComponent;
    composers.forEach(composer => {
      if (typeof composer !== 'function') {
        throw new Error('Composer should be a function.');
      }

      finalComponent = composer(finalComponent);

      if (finalComponent === null || finalComponent === undefined) {
        throw new Error('Composer function should return a value.');
      }
    });

    return finalComponent;
  };
}

export default composeAll;
