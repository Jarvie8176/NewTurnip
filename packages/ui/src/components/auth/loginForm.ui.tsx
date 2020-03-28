import { Form, Input } from "antd";
import React from "react";
import { ModalFormInnerProps } from "../common/modalForm.interface";
import { createModalForm, FormUI } from "../common/modalForm.ui";

export const LoginForm = (props: ModalFormInnerProps) => {
  const [formInstance] = Form.useForm();
  const formComponent = (
    <FormUI form={formInstance}>
      <Form.Item
        name="username"
        label="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
    </FormUI>
  );
  return createModalForm({ formInstance, formComponent, ...props });
};
