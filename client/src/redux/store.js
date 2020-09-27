import { createStore, applyMiddleware, compose } from "redux";
// import { persistStore } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

// import { userSagas } from "./user/user.sagas";
import rootSaga from "./root-saga";

// import userReducer from "./user/user.reducer";
import rootReducer from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// if (process.env.NODE_ENV === "development") {
middlewares.push(logger);
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store);

export default store;
