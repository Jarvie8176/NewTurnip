import React, { Fragment } from "react";
import styled from "styled-components";
import { Config } from "../../shared/config";

const TopImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 100vw;

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

export const IntroComponent = () => {
  const slackWorkspaceLink = Config.SLACK_WORKSPACE_LINK;
  const qqGroupLink = Config.QQ_GROUP_LINK;

  return (
    <Fragment>
      <TopImagesContainer>
        <img src={"/gUlxvTr.png"} style={{ maxWidth: "100vw" }} alt={"meme"} />
        <span>改进建议、bug提交、需求讨论、参与开发：</span>
        <Icons>
          <a href={"https://github.com/Jarvie8176/NewTurnip"} target="_blank" rel="noopener noreferrer">
            <img src={"/GitHub-Mark-32px.png"} style={{ width: "32px", height: "100%" }} alt={"github"} />
          </a>
          <a href={slackWorkspaceLink} target="_blank" rel="noopener noreferrer">
            <img src={"/slack-32px.png"} style={{ width: "32px", height: "100%" }} alt={"github"} />
          </a>
        </Icons>
        <a href={qqGroupLink} target="_blank" rel="noopener noreferrer">
          <span>QQ群：773875087</span>
        </a>
      </TopImagesContainer>
    </Fragment>
  );
};
