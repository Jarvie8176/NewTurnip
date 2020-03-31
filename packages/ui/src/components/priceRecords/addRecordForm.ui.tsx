import { DatePicker, Form, Input, InputNumber } from "antd";
import { observer } from "mobx-react";
import moment from "moment-timezone";
import React from "react";
import { useRootStore } from "../../shared/rootStore";
import { ModalFormInnerProps } from "../common/modalForm.interface";
import { createModalForm, FormUI } from "../common/modalForm.ui";
import { SWCodeInput } from "../common/swCodeInput.ui";

export const AddRecordForm = observer((props: ModalFormInnerProps) => {
  const { priceRecordsStore, profileStore } = useRootStore();
  const confirmLoading = priceRecordsStore.createRecordLoading;

  const { playerName, islandName, swCode } = profileStore.profileData?.profile.settings || {};
  const reportedAt = moment();

  const initialValues = {
    playerName,
    islandName,
    swCode,
    reportedAt,
  };

  const [formInstance] = Form.useForm();
  const formComponent = (
    <FormUI form={formInstance} initialValues={initialValues}>
      <Form.Item label="岛主" name="playerName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="岛名" name="islandName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="好友代码" name="swCode" rules={[{ required: false }]}>
        <SWCodeInput />
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
