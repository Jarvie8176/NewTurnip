import React from "react";
import { Helmet } from "react-helmet";
import "./App.less";
import { MainPageComponent } from "./components/mainPage/mainPage.component";
import { Config } from "./shared/config";

function App() {
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
