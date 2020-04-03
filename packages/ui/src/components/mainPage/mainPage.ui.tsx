import { Layout } from "antd";
import React, { Fragment } from "react";
import styled from "styled-components";
import AuthComponent from "../auth/auth.component";
import { ControlPanel } from "../controlPanel/controlPanel.ui";
import PriceRecordsComponent from "../priceRecords/priceRecords.component";
import ProfileComponent from "../profile/profile.component";
import { SessionControl } from "../session/session.component";

const ContentWrapper = styled.div`
  & > * {
    margin-bottom: 1em;
  }
`;

export const MainPageWrapper = () => {
  return (
    <Fragment>
      <SessionControl />
      <Layout.Header>
        <h2 style={{ color: "#fff" }}>炒萝卜啦！动物森友会</h2>
      </Layout.Header>
      <Layout.Content style={{ maxWidth: "95vw", maxHeight: "95vh" }}>
        <ContentWrapper>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={"gUlxvTr.png"} style={{ maxWidth: "100vw" }} alt={"meme"} />
          </div>
          <ControlPanel />
          <ProfileComponent />
          <AuthComponent />
          <PriceRecordsComponent />
        </ContentWrapper>
      </Layout.Content>
    </Fragment>
  );
};
