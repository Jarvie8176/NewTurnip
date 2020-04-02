import { decodeDto } from "@ansik/sdk/lib/utils";
import { CreateUser, Login } from "@turnip-market/dtos";
import _ from "lodash";
import { observer } from "mobx-react";
import React, { PureComponent } from "react";
import { rootStoreContext } from "../../shared/rootStore";
import { ModalFormUIProps, TOnFormCreate } from "../common/modalForm.interface";
import NotificationManager from "../notification/notificationManager";
import { AuthControlWrapper } from "./authControl.ui";

@observer
export default class AuthComponent extends PureComponent {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>;

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
    this.context.authState.setLoginFormVisible(visible);
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
    console.log("toggleRegisterForm", visible);
    this.context.authState.setRegisterFormVisible(visible);
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
    const { loginFormVisible, registerFormVisible } = this.context.authState;

    const loginFormProps: ModalFormUIProps = {
      onCreate: this.onLoginFormCreate,
      onCancel: () => this.toggleLoginForm(false),
    };
    const registerFormProps: ModalFormUIProps = {
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
        loginFormVisible={loginFormVisible}
        registerFormVisible={registerFormVisible}
      />
    );
  }
}
