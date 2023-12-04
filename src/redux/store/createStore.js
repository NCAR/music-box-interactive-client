import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import combinedReducer from "../reducers";
import pollingMiddleware from "../middleware/polling";

export const store = createStore(
  combinedReducer, 
  applyMiddleware(thunk, pollingMiddleware)
);