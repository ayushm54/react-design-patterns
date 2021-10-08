export const NumberedList = ({
  items,
  resourceName,
  itemComponent: ItemComponent,
}) => {
  return (
    <>
      {items.map((item, i) => (
        <div style={{ display: "flex" }}>
          <h3>{i + 1}. </h3>
          <div>
            <ItemComponent key={i} {...{ [resourceName]: item }} />
          </div>
        </div>
      ))}
    </>
  );
};
