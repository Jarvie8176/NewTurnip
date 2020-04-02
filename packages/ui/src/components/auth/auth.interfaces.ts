import { AuthTokenType } from "../common/auth.dto";
import { ModalFormUIProps } from "../common/modalForm.interface";

// fixme: load directly from AuthToken.Type
export interface AuthToken extends AuthTokenType {}

export interface IAuthState {
  loginFormVisible: boolean;
  registerFormVisible: boolean;
}

export interface AuthFormControl {
  onLoginButtonClick: () => void;
  onRegisterButtonClick: () => void;
  onLogoutButtonClick: () => void;
}

export interface AuthModalFormControl {
  loginForm: ModalFormUIProps;
  registerForm: ModalFormUIProps;
}

export type AuthControlProps = IAuthState & AuthModalFormControl;

export const authTokenStorageLabel = "AUTH_TOKEN";
