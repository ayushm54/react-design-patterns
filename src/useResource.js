/*
This is a custom hook that loads any resource from server
*/
import { useState, useEffect } from "react";
import axios from "axios";

export const useResource = (resourceUrl) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(resourceUrl);
      setResource(response.data);
    })();
  }, [resourceUrl]);

  /*
  Basically, from custom hook we return the final output that the hook is written for
  */
  return resource;
};
