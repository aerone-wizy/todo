import { takeLatest, put, all, call } from "redux-saga/effects";

import TodoActionTypes from "./todo.types";

import {
  createRequest,
  readRequest,
  updateRequest,
  deleteRequest,
} from "./todo.requests";

import {
  createTodoSuccess,
  createTodoFailure,
  readTodosSuccess,
  readTodosFailure,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodoSuccess,
  deleteTodoFailure,
} from "./todo.actions";

export function* createTodo({ payload: { todo, dueDate, dueTime } }) {
  try {
    const res = yield createRequest(todo, dueDate, dueTime);

    if (res.error) yield put(createTodoFailure(res.error));
    else yield put(createTodoSuccess(res));
  } catch (error) {
    yield put(readTodosFailure(error));
  }
}

export function* readTodos() {
  try {
    const res = yield readRequest();

    if (res.error) yield put(readTodosFailure(res.error));
    else yield put(readTodosSuccess(res.todos, res.msg));
  } catch (error) {
    yield put(readTodosFailure(error));
  }
}

export function* updateTodo({ payload: { id, todo, dueTime, isDone } }) {
  try {
    const res = yield updateRequest(id, todo, dueTime, isDone);

    if (res.error) yield put(deleteTodoFailure(res.error));
    else yield put(updateTodoSuccess(res.todos, res.msg));
  } catch (error) {
    yield put(deleteTodoFailure(error));
  }
}

export function* deleteTodo({ payload }) {
  try {
    const res = yield deleteRequest(payload);

    if (res.error) yield put(updateTodoFailure(res.error));
    else yield put(deleteTodoSuccess(res.todos, res.msg));
  } catch (error) {
    yield put(updateTodoFailure(error));
  }
}

export function* onCreateTodoStart() {
  yield takeLatest(TodoActionTypes.CREATE_TODO_START, createTodo);
}

export function* onReadTodosStart() {
  yield takeLatest(TodoActionTypes.READ_TODOS_START, readTodos);
}

export function* onUpdateTodoStart() {
  yield takeLatest(TodoActionTypes.UPDATE_TODO_START, updateTodo);
}

export function* onDeleteTodoStart() {
  yield takeLatest(TodoActionTypes.DELETE_TODO_START, deleteTodo);
}

export function* todoSagas() {
  yield all([
    call(onCreateTodoStart),
    call(onReadTodosStart),
    call(onUpdateTodoStart),
    call(onDeleteTodoStart),
  ]);
}
