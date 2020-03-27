import { Layout } from "antd";
import React, { Fragment } from "react";
import AuthComponent from "../Auth/controlBar.component";
import PriceRecordsComponent from "../PriceRecords/priceRecords.component";

export const MainPageWrapper = () => {
  return (
    <Fragment>
      <Layout.Header>
        <h2 style={{ color: "#fff" }}>炒萝卜啦！动物森友会</h2>
      </Layout.Header>
      <Layout.Content>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={"gUlxvTr.png"} style={{ maxWidth: "100vw" }} alt={"meme"} />
        </div>
        <AuthComponent />
        <PriceRecordsComponent />
      </Layout.Content>
    </Fragment>
  );
};
