import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./bootstrap-override.scss";
import * as serviceWorker from "./serviceWorker";
import "./i18n";
import App from "./container/App";

ReactDOM.render(<App/>
,
  document.getElementById("root")
);

serviceWorker.unregister();
