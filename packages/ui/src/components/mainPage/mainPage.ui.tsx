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

const TopImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

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
      <TopImagesContainer>
        <img src={"gUlxvTr.png"} style={{ maxWidth: "100vw" }} alt={"meme"} />
        <a href={"https://github.com/Jarvie8176/NewTurnip"} target="_blank" rel="noopener noreferrer">
          <img src={"GitHub-Mark-32px.png"} style={{ maxWidth: "100vw" }} alt={"github"} />
        </a>
      </TopImagesContainer>
      <Layout.Content style={{ padding: "2.5vh 2.5vw" }}>
        <ContentWrapper>
          <ControlPanel />
          <ProfileComponent />
          <AuthComponent />
          <PriceRecordsComponent />
        </ContentWrapper>
      </Layout.Content>
    </Fragment>
  );
};
