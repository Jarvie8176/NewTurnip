import { decodeDto } from "@ansik/sdk/lib/utils";
import { CreateUser, Login } from "@turnip-market/dtos";
import _ from "lodash";
import React, { PureComponent } from "react";
import { rootStoreContext } from "../../shared/rootStore";
import { ModalFormUIProps, TOnFormCreate } from "../common/modalForm.interface";
import NotificationManager from "../notification/notificationManager";
import { AuthComponentState } from "./auth.interfaces";
import { AuthControlWrapper } from "./authControl.ui";

export default class AuthComponent extends PureComponent<{}, AuthComponentState> {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>;

  state = {
    loginForm: {
      visible: false,
    },
    registerForm: {
      visible: false,
    },
  };

  login = async (input: Login.Request.Type) => {
    try {
      await this.context.authStore.authenticate(input);
      await this.context.profileStore
        .loadCurrentUserProfile()
        .catch((err) => console.log("failed to load user profile", err));
    } catch (err) {
      NotificationManager.ShowError(err);
      throw err;
    }
    this.toggleLoginForm(false);
  };

  logout = async () => {
    await this.context.authStore.logout();
    await this.context.profileStore.clear();
  };

  register = async (input: CreateUser.Request.Type) => {
    await this.context.authStore.register(input).catch((err) => {
      NotificationManager.ShowError(err);
      throw err;
    });
    this.toggleRegisterForm(false);
  };

  toggleLoginForm = (visible: boolean) => {
    this.setState({ loginForm: { visible } });
  };

  onLoginFormCreate: TOnFormCreate = async (input, confirm) => {
    const payload = {
      username: _.get(input, "username"),
      password: _.get(input, "password"),
    };
    const authPayload = decodeDto(Login.Request.dto, payload);
    await this.login(authPayload);
    confirm();
  };

  toggleRegisterForm = (visible: boolean) => {
    this.setState({ registerForm: { visible } });
  };

  onRegisterFormCreate: TOnFormCreate = async (input, confirm) => {
    const payload = {
      username: _.get(input, "username"),
      password: _.get(input, "password"),
      email: _.get(input, "username"),
    };
    const authPayload = decodeDto(CreateUser.Request.dto, payload);
    await this.register(authPayload);
    confirm();
  };

  render() {
    const loginFormProps: ModalFormUIProps = {
      visible: this.state.loginForm.visible,
      onCreate: this.onLoginFormCreate,
      onCancel: () => this.toggleLoginForm(false),
    };
    const registerFormProps: ModalFormUIProps = {
      visible: this.state.registerForm.visible,
      onCreate: this.onRegisterFormCreate,
      onCancel: () => this.toggleRegisterForm(false),
    };

    return (
      <AuthControlWrapper
        onLoginButtonClick={() => this.toggleLoginForm(true)}
        onRegisterButtonClick={() => this.toggleRegisterForm(true)}
        onLogoutButtonClick={this.logout}
        loginForm={loginFormProps}
        registerForm={registerFormProps}
      />
    );
  }
}
