import { Form, Input } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { useRootStore } from "../../shared/rootStore";
import { ModalFormInnerProps } from "../common/modalForm.interface";
import { createModalForm, FormUI } from "../common/modalForm.ui";

export const RegisterForm = observer((props: ModalFormInnerProps) => {
  const { authStore } = useRootStore();
  const confirmLoading = authStore.loading;

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
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              if (!value || getFieldValue("password") === value) return Promise.resolve();
              return Promise.reject("The two passwords that you entered do not match!");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    </FormUI>
  );
  return createModalForm({ confirmLoading, formInstance, formComponent, ...props });
});
