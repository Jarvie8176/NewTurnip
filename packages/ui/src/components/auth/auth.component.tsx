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
      await this.context.profileStore.loadCurrentUserProfile().catch((err: Error) => {
        console.log("failed to load user profile", err);
      });
      this.toggleLoginForm(false);
    } catch (err) {
      NotificationManager.ShowError(err);
      throw err;
    }
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

  toggleLoginForm = (visible: boolean) => {
    this.context.authState.setLoginFormVisible(visible);
  };

  register = async (input: CreateUser.Request.Type) => {
    await this.context.authStore.register(input).catch((err: Error) => {
      NotificationManager.ShowError(err);
      throw err;
    });
    this.toggleRegisterForm(false);
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

  toggleRegisterForm = (visible: boolean) => {
    this.context.authState.setRegisterFormVisible(visible);
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
        loginForm={loginFormProps}
        registerForm={registerFormProps}
        loginFormVisible={loginFormVisible}
        registerFormVisible={registerFormVisible}
      />
    );
  }
}
