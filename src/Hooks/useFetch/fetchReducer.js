import { ERROR, LOADING, RESPONSE_COMPLETE } from "./actionTypes";

const fetchReducer = (state, action) => {
  if (action.type === LOADING) {
    return {
      result: null,
      loading: true,
      error: null,
    };
  }

  if (action.type === RESPONSE_COMPLETE) {
    let posts = action.payload.response.map((obj) => {
      let date = new Date(obj.calendardatetime);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const dayString = `${month + 1}/${day}/${year}`;
      obj["date"] = dayString;
      return obj;
    });
    return {
      result: posts,
      loading: false,
      error: null,
    };
  }

  if (action.type === ERROR) {
    return {
      result: null,
      loading: false,
      error: action.payload.error,
    };
  }

  return state;
};

export default fetchReducer;
