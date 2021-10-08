/*
This component will be used for user modification on server
*/

import { withEditableResource } from "./withEditableResource";

export const UserInfoFormUsingResource = withEditableResource(
  ({ user, onChangeUser, onSaveUser, onResetUser, userId }) => {
    const { name, age, hairColor } = user || {};
    console.log(userId);
    return user ? (
      <>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => onChangeUser({ name: e.target.value })}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={age}
            onChange={(e) => onChangeUser({ age: Number(e.target.value) })}
          />
        </label>
        <label>
          Hair Color:
          <input
            type="text"
            name="hairColor"
            value={hairColor}
            onChange={(e) => onChangeUser({ hairColor: e.target.value })}
          />
        </label>
        <button onClick={onResetUser}>Reset</button>
        <button onClick={onSaveUser}>Save Changes</button>
      </>
    ) : (
      <p>Loading...</p>
    );
  },
  "users/123",
  "user"
);
