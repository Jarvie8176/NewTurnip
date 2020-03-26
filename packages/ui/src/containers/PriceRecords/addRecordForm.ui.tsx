import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import React from "react";

interface IProps {
  visible: ModalProps["visible"];
  confirmLoading: ModalProps["confirmLoading"];
  onCancel: ModalProps["onCancel"];
  onCreate: (input: {}, confirm: () => void) => Promise<unknown>;
}

const layout = {
  labelCol: {
    span: 4,
  },
};
const tailLayout = {
  wrapperCol: {},
};

export const AddRecordForm = (props: IProps) => {
  const { visible, confirmLoading, onCreate, onCancel } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={async () => {
        const values = await form.validateFields();
        await onCreate(values, () => form.resetFields());
      }}
      onCancel={(...args) => {
        form.resetFields();
        onCancel && onCancel(...args);
      }}
    >
      <p>foo</p>
      <Form {...layout} form={form}>
        <Form.Item {...tailLayout} label="叫啥" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout} label="好友代码" name="swCode" rules={[{ required: false }]}>
          <Input placeholder={"0123-4567-89AB"} />
        </Form.Item>
        <Form.Item
          {...tailLayout}
          label="萝卜报价"
          name="price"
          rules={[{ type: "number", min: 0, max: 9999 }, { required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item {...tailLayout} label="记录时间" name="reportedAt" rules={[{ required: true }]}>
          <DatePicker showTime />
        </Form.Item>
      </Form>
    </Modal>
  );
};
