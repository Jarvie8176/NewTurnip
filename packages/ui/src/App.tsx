import React from "react";

import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import "./App.less";
import { MainPageComponent } from "./components/mainPage/mainPage.component";
import { Config } from "./shared/config";

function App() {
  ReactGA.initialize(Config.GA_TRACKER_TAG);
  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <div className="App">
      <Helmet>
        <title>{Config.APP_TITLE}</title>
      </Helmet>
      <MainPageComponent />
    </div>
  );
}

export default App;
