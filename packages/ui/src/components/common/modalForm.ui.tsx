import { Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { FormUIProps, ModalFormProps, ModalFormWrapperProps, ModalUIProps } from "./modalForm.interface";

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

const ModalUI = (props: ModalUIProps) => {
  const { visible, onOk, onCancel } = props;

  const [reloaded, setReloaded] = useState(false);

  const { form } = props;

  useEffect(() => {
    if (!visible || reloaded) return;
    form.resetFields();
    console.log("reload form initial values");
    setReloaded(true);
  }, [visible, form, reloaded]);

  return (
    <Modal
      width={"80vw"}
      onOk={onOk}
      onCancel={(...args) => {
        form.resetFields();
        onCancel?.(...args);
      }}
      afterClose={() => setReloaded(false)}
      {...props}
    />
  );
};

export const ModalForm = (props: ModalFormProps) => {
  const { form, formComponent, onCreate, modalProps, ...otherProps } = props;

  const modalOnOk = async () => {
    const values = await form.validateFields();
    await onCreate(values, () => form.resetFields());
  };

  return (
    <ModalUI form={form} onOk={modalOnOk} {...modalProps} {...otherProps}>
      {formComponent}
    </ModalUI>
  );
};

export const ModalFormWrapper = (props: ModalFormWrapperProps) => {
  const { getFormComponent, ...otherProps } = props;

  const [form] = Form.useForm();
  const formComponent = getFormComponent(form);

  return <ModalForm formComponent={formComponent} form={form} {...otherProps} />;
};
