import React from "react"
import { Provider } from "react-redux"
import { store } from "./createStore";

// WrapWithProvider
const wrapApp = ({ element }) => {
  return <Provider store={store}>{element}</Provider>
};

export default wrapApp;
