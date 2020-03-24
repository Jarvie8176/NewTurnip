import React, { PureComponent } from "react";
import PriceRecords from "./PriceRecords";

export default class MainPage extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <h1>炒股啦！动物森友会</h1>
        <PriceRecords />
      </React.Fragment>
    );
  }
}
