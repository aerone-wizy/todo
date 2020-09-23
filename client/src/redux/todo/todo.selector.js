import { createSelector } from "reselect";

const selectUser = (state) => state.todo;

export const selectTodos = createSelector([selectUser], (todo) => todo.todos);
