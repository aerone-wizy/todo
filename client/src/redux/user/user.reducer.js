import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  isAuthenticated: false,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_START:
    case UserActionTypes.SIGN_UP_START:
    case UserActionTypes.SIGN_OUT_START:
    case UserActionTypes.CHECK_USER_SESSION:
      return {
        ...state,
        isAuthenticated: false,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        currentUser: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        currentUser: null,
        isAuthenticated: true,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        isAuthenticated: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
