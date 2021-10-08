/* 
This is just another way to do composition
*/

export const partiallyApplyHoc = (Component, partialProps) => {
  return (props) => {
    return <Component {...partialProps} {...props} />;
  };
};

export const Button = ({ size, color, text, ...props }) => {
  return (
    <button
      style={{
        padding: size === "large" ? "32px" : "8px",
        fontSize: size === "large" ? "32px" : "16px",
        backgroundColor: color,
      }}
      {...props}
    >
      {text}
    </button>
  );
};

export const DangerButtonPartiallyAppied = partiallyApplyHoc(Button, {
  color: "red",
});

export const BigSuccessButtonPartiallyAppied = partiallyApplyHoc(Button, {
  color: "green",
  size: "large",
});
