import { ModalFormInnerProps, ModalFormState } from "../common/modalForm.interface";

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

export interface AuthToken {
  accessToken: string;
}

export const authTokenStorageLabel = "AUTH_TOKEN";
