import { AuthTokenType } from "../common/auth.dto";
import { ModalFormState, ModalFormUIProps } from "../common/modalForm.interface";

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

export interface AuthModalFormControl {
  loginForm: ModalFormUIProps;
  registerForm: ModalFormUIProps;
}

export type AuthControlProps = AuthComponentState & AuthFormControl & AuthModalFormControl;

export const authTokenStorageLabel = "AUTH_TOKEN";
