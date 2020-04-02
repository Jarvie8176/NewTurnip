import { action, observable } from "mobx";
import { IAuthState } from "./auth.interfaces";

export class AuthState implements IAuthState {
  @observable loginFormVisible: boolean = false;
  @observable registerFormVisible: boolean = false;

  @action setLoginFormVisible(visible: boolean): void {
    this.loginFormVisible = visible;
  }

  @action setRegisterFormVisible(visible: boolean): void {
    this.registerFormVisible = visible;
  }
}
