import { Form, Input } from "antd";
import { FormInstance } from "antd/lib/form";
import { observer } from "mobx-react";
import React from "react";
import { useRootStore } from "../../shared/rootStore";
import { FormUIProps, ModalFormUIProps } from "../common/modalForm.interface";
import { FormUI, ModalFormWrapper } from "../common/modalForm.ui";

const LoginModalFormInnerForm = (props: FormUIProps) => {
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
      <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input your password!" }]}>
        <Input.Password />
      </Form.Item>
    </FormUI>
  );
};

export const LoginModalForm = observer((props: ModalFormUIProps) => {
  const visible = useRootStore().authState.loginFormVisible;
  const getFormComponent = (form: FormInstance) => <LoginModalFormInnerForm form={form} {...props} />;
  return <ModalFormWrapper visible={visible} getFormComponent={getFormComponent} {...props} />;
});
