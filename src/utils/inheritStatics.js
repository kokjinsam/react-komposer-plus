import hoistStatics from 'hoist-non-react-statics';

export default function inheritStatics(Container, ChildComponent, displayName = 'Container') {
  const childDisplayName = ChildComponent.displayName || ChildComponent.name || 'ChildComponent';

  Container.displayName = `${displayName}(${childDisplayName})`;
  return hoistStatics(Container, ChildComponent);
}
