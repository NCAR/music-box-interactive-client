import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import combinedReducer from "../reducers";
import pollingMiddleware from "../middleware/polling";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, pollingMiddleware),
);

export const persistor = persistStore(store);
