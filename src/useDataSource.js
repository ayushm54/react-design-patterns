/*
This is a custom hook that loads data from any datasource like server, localStorage,etc.
*/
import { useState, useEffect } from "react";

export const useDataSource = (getResourceFunc) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getResourceFunc();
      setResource(result);
    })();
  }, []);

  /*
  Basically, from custom hook we return the final output that the hook is written for
  */
  return resource;
};
