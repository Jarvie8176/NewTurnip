import React from "react";
import styled from "styled-components";
import { SessionControl } from "../user/session.ui";
import { AuthStateControl } from "./auth.interfaces";

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
`;

export const ControlBar = (props: AuthStateControl) => {
  return (
    <Buttons>
      <SessionControl {...props} />
    </Buttons>
  );
};
