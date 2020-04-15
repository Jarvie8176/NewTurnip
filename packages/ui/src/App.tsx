import React from "react";

import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import "./App.less";
import { MainPageComponent } from "./components/mainPage/mainPage.component";
import { Config } from "./shared/config";

function App() {
  ReactGA.initialize(Config.GA_TRACKER_TAG);
  ReactGA.pageview(window.location.pathname + window.location.search);

  const { t } = useTranslation();

  return (
    <div className="App">
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      <MainPageComponent />
    </div>
  );
}

export default App;
