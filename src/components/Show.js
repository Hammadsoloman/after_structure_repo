const Show = props => {
  return props.condition ? props.children : null;
};

export default Show;
