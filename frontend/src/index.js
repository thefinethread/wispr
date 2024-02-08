import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store/store";
import { SocketContextProvider } from "./context/socketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <SocketContextProvider>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </SocketContextProvider>,
  // </React.StrictMode>,
);
