import { configure } from "mobx";
import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { RootStore } from "./shared/rootStore";

configure({ enforceActions: "always" });

ReactDOM.render(
  //  <React.StrictMode>
  <Provider {...RootStore}>
    <App />
  </Provider>,
  //  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
