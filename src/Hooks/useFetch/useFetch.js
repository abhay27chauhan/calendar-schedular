import { useEffect } from "react";
// import toast from "react-hot-toast";

// import initialState from "./initialState";
// import fetchReducer from "./fetchReducer";

const body = {
  requestobjects: [
    {
      posts: {
        operationtype: "read",
        id: {
          return: true,
        },
        userid: {
          searchvalues: ["adbef521-7cf6-4344-af48-a9480df46549"],
          return: true,
        },
        iscalendarentry: {
          searchvalues: ["true"],
          return: true,
        },
        media: {
          return: true,
        },
        rating: {
          return: true,
        },
        text: {
          return: true,
        },
        privacy: {
          searchvalues: [18],
          return: true,
        },
        typeofday: {
          return: true,
        },
        calendardatetime: {
          return: true,
          sort: "descending",
        },
        maxitemcount: "20",
        continuationtoken: null,
      },
    },
  ],
};

const useFetch = (url) => {
  //const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // dispatch({ type: "LOADING" });

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
        console.log(data);
        // if (data.status === "success") {
        //   toast.success("Quiz Started");
        // }
        // dispatch({
        //   type: "RESPONSE_COMPLETE",
        //   payload: { response: data.task_array },
        // });
      } catch (error) {
        // toast.error("Something went wrong!!");
        console.log(error);
        // dispatch({ type: "ERROR", payload: { error } });
      }
    };

    fetchUrl();
  }, []);

  //   return [state.result, state.loading, state.error];
};

export default useFetch;
