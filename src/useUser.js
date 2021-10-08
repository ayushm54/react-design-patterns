/*
This is a custom hook that loads the user from server
*/
import { useState, useEffect } from "react";
import axios from "axios";

export const useUser = (userId) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`users/${userId}`);
      setUser(response.data);
    })();
  }, [userId]);

  /*
  Basically, from custom hook we return the final output that the hook is written for
  */
  return user;
};
