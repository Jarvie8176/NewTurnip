import i18next from "i18next";
import { configure } from "mobx";
import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { RootStore } from "./shared/rootStore";
require("./components/i18n/loader");

configure({ enforceActions: "always" });

ReactDOM.render(
  //  <React.StrictMode>
  <Provider {...RootStore}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Provider>,
  //  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
