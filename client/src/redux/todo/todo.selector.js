import { createSelector } from "reselect";

const selectTodo = (state) => state.todo;

export const selectTodos = createSelector([selectTodo], (todo) => todo.todos);
export const selectMsg = createSelector([selectTodo], (todo) => todo.msg);
