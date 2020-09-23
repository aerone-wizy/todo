import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import todoReducer from "./todo/todo.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  todo: todoReducer,
});

export default rootReducer;
