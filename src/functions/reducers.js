export function postReducer(state, action) {
  switch (action.type) {
    case "POST_REQUEST":
      return { ...state, loading: true, error: "" };
    case "POST_SUCCESS":
      return { ...state, posts: action.payload, loading: false, error: "" };
    case "POST_FAILED":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
export function profileReducer(state, action) {
  switch (action.type) {
    case "PROFILE_REQUEST":
      return { ...state, loading: true, error: "" };
    case "PROFILE_SUCCESS":
      return { ...state, profile: action.payload, loading: false, error: "" };
    case "PROFILE_FAILED":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
