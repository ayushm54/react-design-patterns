/*
This is a custom hook that loads the current user from server
*/
import { useState, useEffect } from "react";
import axios from "axios";

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/current-user");
      setUser(response.data);
    })();
  }, []);

  /*
  Basically, from custom hook we return the final output that the hook is written for
  */
  return user;
};
