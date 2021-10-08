export const printPropsHoc = (Component) => {
  return (props) => {
    console.log(props);
    return <Component {...props} />;
  };
};
