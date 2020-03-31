import { Layout } from "antd";
import React, { Fragment } from "react";
import styled from "styled-components";
import { UserControlPanel } from "../controlPanel/UserControlPanel.ui";
import PriceRecordsComponent from "../priceRecords/priceRecords.component";

const ContentWrapper = styled.div`
  & > * {
    margin-bottom: 1em;
  }
`;

export const MainPageWrapper = () => {
  return (
    <Fragment>
      <Layout.Header>
        <h2 style={{ color: "#fff" }}>炒萝卜啦！动物森友会</h2>
      </Layout.Header>
      <Layout.Content>
        <ContentWrapper>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={"gUlxvTr.png"} style={{ maxWidth: "100vw" }} alt={"meme"} />
          </div>
          <UserControlPanel />
          <PriceRecordsComponent />
        </ContentWrapper>
      </Layout.Content>
    </Fragment>
  );
};
