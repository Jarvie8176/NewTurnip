import { Form, Input } from "antd";
import { FormInstance } from "antd/lib/form";
import { observer } from "mobx-react";
import React from "react";
import { useRootStore } from "../../shared/rootStore";
import { FormUIProps, ModalFormUIProps } from "../common/modalForm.interface";
import { FormUI, ModalFormWrapper } from "../common/modalForm.ui";

const RegisterModalFormInnerForm = (props: FormUIProps) => {
  const { form } = props;
  return (
    <FormUI form={form}>
      <Form.Item
        name="username"
        label="email"
        rules={[
          { type: "email", message: "The input is not valid E-mail!" },
          { required: true, message: "Please input your E-mail!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
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
          { required: true, message: "Please confirm your password!" },
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
};

export const RegisterModalForm = observer((props: ModalFormUIProps) => {
  const { authStore, authState } = useRootStore();
  const confirmLoading = authStore.loading;
  const visible = authState.registerFormVisible;

  const getFormComponent = (form: FormInstance) => <RegisterModalFormInnerForm form={form} {...props} />;
  return (
    <ModalFormWrapper
      visible={visible}
      modalProps={{ confirmLoading }}
      getFormComponent={getFormComponent}
      {...props}
    />
  );
});
