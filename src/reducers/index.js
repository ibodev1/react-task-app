const INITIAL_STATE = {
  login: false,
  isLoading: false,
  accessToken: "",
  lists: [],
  user: [],
  messages: "",
  status: "warning",
  secili_lists: {
    data: [],
    loading: true,
    title: window.localStorage.getItem("secili_title") || "",
    id: window.localStorage.getItem("secili_id") || "",
    updated: window.localStorage.getItem("secili_updated") || "",
  },
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_LISTS_START":
      return {
        ...state,
        isLoading: true,
        message: "",
        status: "wait",
        login: false,
      };
    case "GET_LISTS_SUCCESS":
      return {
        ...state,
        lists: action.lists,
        user: action.user,
        accessToken: action.accessToken,
        secili_lists: {
          title: action.secili_lists.title,
          id: action.secili_lists.id,
          updated: action.secili_lists.updated,
        },
        isLoading: false,
        status: "success",
        login: true,
      };
    case "GET_LISTS_ERROR":
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        status: "error",
        login: false,
      };

    case "LOGOUT":
      return {
        ...state,
        login: false,
        isLoading: false,
        accessToken: "",
        lists: [],
        user: [],
        messages: "",
        status: "warning",
        secili_lists: {
          title: "",
          id: "",
          updated: "",
        },
      };
    case "SECILI_CHANGE_START":
      return {
        ...state,
        secili_lists: {
          loading: true,
          messages: "",
          status: "wait",
        },
      };
    case "SECILI_CHANGE_SUCCESS":
      return {
        ...state,
        secili_lists: {
          loading: false,
          data: action.secili_lists.data,
          title: action.secili_lists.title,
          id: action.secili_lists.id,
          updated: action.secili_lists.updated,
          status: "success",
        },
      };
    case "SECILI_CHANGE_ERROR":
      return {
        ...state,
        secili_lists: {
          loading: true,
          message: action.error,
          status: "error",
        },
      };
    default:
      return state;
  }
};
