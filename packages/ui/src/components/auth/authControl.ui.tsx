import { observer } from "mobx-react";
import React, { Fragment } from "react";
import styled from "styled-components";
import { useRootStore } from "../../shared/rootStore";
import { AuthControlProps } from "./auth.interfaces";
import { AuthButton } from "./authButton.ui";
import { LoginForm } from "./loginForm.ui";
import { RegisterForm } from "./registerForm.ui";

const Authenticated = styled.div`
  display: flex;
  padding: 1em;

  > button + button {
    margin-left: 1em;
  }
`;
const NotAuthenticated = styled.div`
  display: flex;
  padding: 1em;

  > button + button {
    margin-left: 1em;
  }
`;

export const AuthControlWrapper = observer((props: AuthControlProps) => {
  const { onLoginButtonClick, onRegisterButtonClick, onLogoutButtonClick, loginForm, registerForm } = props;
  const { authStore } = useRootStore();
  const { authenticated } = authStore;

  console.log("authenticated", authenticated);

  const displayWhenAuthenticated = (isAuthenticated: boolean) =>
    isAuthenticated === authenticated ? undefined : "none";

  return (
    <Fragment>
      <NotAuthenticated style={{ display: displayWhenAuthenticated(false) }}>
        <AuthButton text={"注册"} onClick={onRegisterButtonClick} />
        <AuthButton text={"登录"} onClick={onLoginButtonClick} />
      </NotAuthenticated>
      <Authenticated style={{ display: displayWhenAuthenticated(true) }}>
        <AuthButton text={"登出"} onClick={onLogoutButtonClick} />
      </Authenticated>
      <LoginForm {...loginForm} />
      <RegisterForm {...registerForm} />
    </Fragment>
  );
});
