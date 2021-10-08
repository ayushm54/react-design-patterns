import { useState, useEffect } from "react";

export const ControlledFormComponent = () => {
  /*
  A Controlled Component is one that takes its current value through props and 
  notifies changes through callbacks like onChange. A parent component "controls" it by 
  handling the callback and managing its own state and passing the new values 
  as props to the controlled component. You could also call this a "dumb component".
   */
  const [nameInputErr, setNameInputErr] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [hairColor, setHairColor] = useState("");

  /*
  Using controlled forms we can validate the data on the go 
  rather then waiting for the fom to be submitted
  */
  useEffect(() => {
    if (name.length < 4) {
      setNameInputErr("Name must be 4 or more characters!");
    } else {
      setNameInputErr("");
    }
  }, [name]);

  return (
    <form>
      {nameInputErr && <p style={{ color: "red" }}>{nameInputErr}</p>}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <input
        type="text"
        name="hairColor"
        placeholder="Hair Color"
        value={hairColor}
        onChange={(e) => setHairColor(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
};
