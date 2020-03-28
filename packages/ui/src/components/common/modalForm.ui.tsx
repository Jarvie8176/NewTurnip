import { Form, Modal } from "antd";
import React from "react";
import styled from "styled-components";
import { FormUIProps, ModalFormProps } from "./modalForm.interface";

const FormContainer = styled.div`
  margin: 1em;
`;

export const FormUI = (props: FormUIProps) => {
  const layout: FormUIProps = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 12,
    },
  };
  return <Form {...layout} {...props} />;
};

export function createModalForm(props: ModalFormProps) {
  const { onCreate, onCancel, formInstance, formComponent } = props;
  const [form] = Form.useForm(formInstance);

  return (
    <Modal
      width={"80vw"}
      onOk={async () => {
        const values = await form.validateFields();
        await onCreate(values, () => form.resetFields());
      }}
      onCancel={(...args) => {
        form.resetFields();
        onCancel?.(...args);
      }}
      {...props}
    >
      <FormContainer>{formComponent}</FormContainer>
    </Modal>
  );
}
