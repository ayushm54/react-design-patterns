import React from "react";

export const UnControlledFormComponent = () => {
  /*
  A Uncontrolled Component is one that stores its own state internally, and you query 
  the DOM using a ref to find its current value when you need it. This is a bit more 
  like traditional HTML.

  This is an uncontrolled component because, only when a event is triggered 
  the state of the form is available, till then each element holds its state with itself
  */
  const nameInput = React.createRef();
  const ageInput = React.createRef();
  const hairColorInput = React.createRef();

  const handleFormSubmit = (e) => {
    console.log(nameInput.current.value);
    console.log(ageInput.current.value);
    console.log(hairColorInput.current.value);
    e.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" name="name" placeholder="Name" ref={nameInput} />
      <input type="number" name="age" placeholder="Age" ref={ageInput} />
      <input
        type="text"
        name="hairColor"
        placeholder="Hair Color"
        ref={hairColorInput}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};
