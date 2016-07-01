import hoistStatics from 'hoist-non-react-statics';

export function inheritStatics(Container, ChildComponent, displayName = 'Container') {
  const childDisplayName = ChildComponent.displayName || ChildComponent.name || 'ChildComponent';

  Container.displayName = `${displayName}(${childDisplayName})`;
  return hoistStatics(Container, ChildComponent);
}
