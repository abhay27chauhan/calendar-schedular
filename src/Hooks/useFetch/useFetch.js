import { useReducer, useEffect } from "react";

import initialState from "./initialState";
import fetchReducer from "./fetchReducer";
import { body } from "utils/constants";
import { ERROR, LOADING, RESPONSE_COMPLETE } from "./actionTypes";

const useFetch = (url) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: LOADING });

    const fetchUrl = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        dispatch({
          type: RESPONSE_COMPLETE,
          payload: { response: data.responseobjects[0]["posts"] },
        });
      } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, payload: { error } });
      }
    };

    fetchUrl();
  }, []);

  return [state.result, state.loading, state.error];
};

export default useFetch;
