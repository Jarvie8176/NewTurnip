import { DatePicker, Form, Input, InputNumber } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { useRootStore } from "../../shared/rootStore";
import { ModalFormInnerProps } from "../common/modalForm.interface";
import { createModalForm, FormUI } from "../common/modalForm.ui";

export const AddRecordForm = observer((props: ModalFormInnerProps) => {
  const { priceRecordsStore } = useRootStore();
  const confirmLoading = priceRecordsStore.createRecordLoading;
  console.log("foo", confirmLoading);

  const [formInstance] = Form.useForm();
  const formComponent = (
    <FormUI form={formInstance}>
      <Form.Item label="叫啥" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="好友代码" name="swCode" rules={[{ required: false }]}>
        <Input placeholder={"0123-4567-89AB"} />
      </Form.Item>
      <Form.Item label="萝卜报价" name="price" rules={[{ type: "number", min: 0, max: 9999 }, { required: true }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="记录时间" name="reportedAt" rules={[{ required: true }]}>
        <DatePicker showTime />
      </Form.Item>
    </FormUI>
  );
  return createModalForm({ confirmLoading, formInstance, formComponent, ...props });
});
