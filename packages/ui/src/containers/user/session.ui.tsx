import { Button } from "antd";
import React from "react";
import styled from "styled-components";

interface IAuthButtonProps {
  text: string;
  onClick: () => void;
}

interface ISessionControlProps {
  onLoginButtonClick: () => void;
  onRegisterButtonClick: () => void;
}

const SessionControlContainer = styled.div`
  > button + button {
    margin-left: 1em;
  }
`;

const AuthButton = (props: IAuthButtonProps) => (
  <Button size={"middle"} shape={"round"} onClick={props.onClick}>
    {props.text}
  </Button>
);

export const SessionControl = (props: ISessionControlProps) => {
  const { onLoginButtonClick, onRegisterButtonClick } = props;
  return (
    <SessionControlContainer>
      <AuthButton text={"登录"} onClick={onLoginButtonClick} />
      <AuthButton text={"注册"} onClick={onRegisterButtonClick} />
    </SessionControlContainer>
  );
};
