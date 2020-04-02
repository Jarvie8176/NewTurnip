import React, { Fragment } from "react";
import { AuthControlProps } from "./auth.interfaces";
import { LoginModalForm } from "./loginForm.ui";
import { RegisterModalForm } from "./registerForm.ui";

export const AuthControlWrapper = (props: AuthControlProps) => {
  const { loginForm, registerForm } = props;

  return (
    <Fragment>
      <LoginModalForm {...loginForm} />
      <RegisterModalForm {...registerForm} />
    </Fragment>
  );
};
