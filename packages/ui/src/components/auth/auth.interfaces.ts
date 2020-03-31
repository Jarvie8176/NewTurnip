import { AuthTokenType } from "../common/auth.dto";
import { ModalFormInnerProps, ModalFormState } from "../common/modalForm.interface";

// fixme: load directly from AuthToken.Type
export interface AuthToken extends AuthTokenType {}

export interface AuthComponentState {
  loginForm: ModalFormState;
  registerForm: ModalFormState;
}

export interface AuthFormControl {
  onLoginButtonClick: () => void;
  onRegisterButtonClick: () => void;
  onLogoutButtonClick: () => void;
}

export interface AuthControlProps extends AuthComponentState, AuthFormControl {
  loginForm: ModalFormInnerProps;
  registerForm: ModalFormInnerProps;
}

export const authTokenStorageLabel = "AUTH_TOKEN";
