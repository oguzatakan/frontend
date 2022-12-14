import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./bootstrap-override.scss";
import * as serviceWorker from "./serviceWorker";
import "./i18n";
import App from "./container/App";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
