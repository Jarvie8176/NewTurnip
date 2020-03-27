export interface AuthState {
  authenticated: boolean;
}

export interface AuthStateControl {
  onLoginButtonClick: () => void;
  onRegisterButtonClick: () => void;
}
