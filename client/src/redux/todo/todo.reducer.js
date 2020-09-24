import TodoActionTypes from "./todo.types";

const INITIAL_STATE = {
  todos: null,
  msg: "",
  error: null,
};

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TodoActionTypes.CREATE_TODO_START:
    case TodoActionTypes.READ_TODOS_START:
    case TodoActionTypes.UPDATE_TODO_START:
    case TodoActionTypes.DELETE_TODO_START:
      return {
        ...state,
        msg: "",
      };
    case TodoActionTypes.CREATE_TODO_SUCCESS:
    case TodoActionTypes.READ_TODOS_SUCCESS:
    case TodoActionTypes.UPDATE_TODO_SUCCESS:
    case TodoActionTypes.DELETE_TODO_SUCCESS:
      return {
        todos: action.payload.todos,
        msg: action.payload.msg,
        error: null,
      };
    case TodoActionTypes.CREATE_TODO_FAILURE:
    case TodoActionTypes.READ_TODOS_FAILURE:
    case TodoActionTypes.UPDATE_TODO_FAILURE:
    case TodoActionTypes.DELETE_TODO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
