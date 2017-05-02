export default function prefetchData(dispatch, components, props) {
  const needs = components
    .filter(component => component)
    .reduce((prev, current) => {
      const wrappedComponent = current.WrappedComponent;
      return (current.need || [])
        .concat((wrappedComponent && wrappedComponent.need) || [])
        .concat(prev);
    }, []);
  return Promise.all([...new Set(needs)].map(need => dispatch(need(props))));
}
