import React from "react";
import styled from "styled-components";
import AuthComponent from "../auth/auth.component";
import ProfileComponent from "../profile/profile.component";

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  Button {
    margin-left: 1em;
  }
`;

export const UserControlPanel = () => {
  return (
    <Wrapper>
      <ProfileComponent />
      <AuthComponent />
    </Wrapper>
  );
};
