import { Layout } from "antd";
import React, { PureComponent } from "react";
import PriceRecords from "./PriceRecords/addRecords.controller";

export default class MainPage extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Layout.Header>
          <h2 style={{ color: "#fff" }}>炒萝卜啦！动物森友会</h2>
        </Layout.Header>
        <Layout.Content>
          <PriceRecords />
        </Layout.Content>
      </React.Fragment>
    );
  }
}
