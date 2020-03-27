import React, { PureComponent } from "react";
import { AuthState } from "./auth.interfaces";
import { ControlBar } from "./auth.ui";

export default class AuthComponent extends PureComponent<{}, AuthState> {
  state = {
    authenticated: false,
  };

  loadAuthState = async () => {
    // todo: load accessToken from cookie
  };

  onLoginFormCreate = async () => {
    // todo: login through repository
  };

  onRegisterFormCreate = async () => {
    // todo: register through repository
  };

  onLoginButtonClick = () => {
    // todo: show login form
  };
  onRegisterButtonClick = () => {
    // todo: show register form
  };

  render() {
    return (
      <ControlBar onLoginButtonClick={this.onLoginButtonClick} onRegisterButtonClick={this.onRegisterButtonClick} />
    );
  }
}
