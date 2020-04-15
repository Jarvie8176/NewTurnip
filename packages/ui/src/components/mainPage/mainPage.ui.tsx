import { Layout } from "antd";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Config } from "../../shared/config";
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
  max-width: 100vw;
  margin-top: 1em;

  & > * {
    margin-bottom: 1em;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    margin-left: 1em;
    margin-right: 1em;
  }
`;

export const MainPageWrapper = () => {
  const slackWorkspaceLink = Config.SLACK_WORKSPACE_LINK;

  const { t } = useTranslation();

  return (
    <Fragment>
      <SessionControl />
      <Layout.Header>
        <h2 style={{ color: "#fff" }}>{t("title")}</h2>
      </Layout.Header>
      <TopImagesContainer>
        <span>{t("introMessage")}</span>
        <Icons>
          <a href={"https://github.com/Jarvie8176/NewTurnip"} target="_blank" rel="noopener noreferrer">
            <img src={"GitHub-Mark-32px.png"} style={{ width: "32px", height: "100%" }} alt={"github"} />
          </a>
          <a href={slackWorkspaceLink} target="_blank" rel="noopener noreferrer">
            <img src={"slack-32px.png"} style={{ width: "32px", height: "100%" }} alt={"github"} />
          </a>
        </Icons>
      </TopImagesContainer>
      <Layout.Content style={{ padding: "2.5vh 2.5vw", maxWidth: "100vw" }}>
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
