import TodoActionTypes from "./todo.types";

export const createTodoStart = (todo, dueDate, dueTime) => ({
  type: TodoActionTypes.CREATE_TODO_START,
  payload: { todo, dueDate, dueTime },
});
export const createTodoSuccess = (result) => ({
  type: TodoActionTypes.CREATE_TODO_SUCCESS,
  payload: result,
});
export const createTodoFailure = (error) => ({
  type: TodoActionTypes.CREATE_TODO_FAILURE,
  payload: error,
});

export const readTodosStart = () => ({
  type: TodoActionTypes.READ_TODOS_START,
});
export const readTodosSuccess = (todos, msg) => ({
  type: TodoActionTypes.READ_TODOS_SUCCESS,
  payload: { todos, msg },
});
export const readTodosFailure = (error) => ({
  type: TodoActionTypes.READ_TODOS_FAILURE,
  payload: error,
});

export const updateTodoStart = (id, todo, dueTime, isDone) => ({
  type: TodoActionTypes.UPDATE_TODO_START,
  payload: { id, todo, dueTime, isDone },
});
export const updateTodoSuccess = (todos, msg) => ({
  type: TodoActionTypes.UPDATE_TODO_SUCCESS,
  payload: { todos, msg },
});
export const updateTodoFailure = (error) => ({
  type: TodoActionTypes.UPDATE_TODO_FAILURE,
  payload: error,
});

export const deleteTodoStart = (id) => ({
  type: TodoActionTypes.DELETE_TODO_START,
  payload: id,
});
export const deleteTodoSuccess = (todos, msg) => ({
  type: TodoActionTypes.DELETE_TODO_SUCCESS,
  payload: { todos, msg },
});
export const deleteTodoFailure = (error) => ({
  type: TodoActionTypes.DELETE_TODO_FAILURE,
  payload: error,
});
