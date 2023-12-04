import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages";
import GettingStarted from "./pages/getting_started";
import Mechanism from "./pages/mechanism"
import Conditions from "./pages/conditions"
import Results from "./pages/results"
import { Provider } from "react-redux";
import { store } from "./redux/store/createStore";
import { MathJaxContext } from "better-react-mathjax";
import { HelmetProvider } from 'react-helmet-async';
import './styles/global.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/getting_started",
    element: <GettingStarted />
  },
  {
    path: "/mechanism",
    element: <Mechanism />
  },
  {
    path: "/conditions",
    element: <Conditions />
  },
  {
    path: "/results",
    element: <Results />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <MathJaxContext>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </MathJaxContext>
    </HelmetProvider>
  </React.StrictMode>,
);
