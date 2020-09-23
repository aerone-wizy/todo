import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectIsAthenticated = createSelector(
  [selectUser],
  (user) => user.isAuthenticated
);
