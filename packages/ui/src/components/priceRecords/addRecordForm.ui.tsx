import { DatePicker, Form, Input, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form";
import { observer } from "mobx-react";
import moment from "moment-timezone";
import React from "react";
import { useRootStore } from "../../shared/rootStore";
import { FormUIProps, ModalFormUIProps } from "../common/modalForm.interface";
import { FormUI, ModalFormWrapper } from "../common/modalForm.ui";
import { SWCodeInput } from "../common/swCodeInput.ui";

const AddRecordModalInnerForm = observer((props: FormUIProps) => {
  const { form } = props;

  const { profileStore } = useRootStore();
  const settings = profileStore.profileData?.profile.settings;

  const playerName = settings?.playerName || null;
  const islandName = settings?.islandName || null;
  const swCode = settings?.swCode || null;
  const dodoCode = settings?.dodoCode || null;
  const reportedAt = moment();

  const initialValues = { playerName, islandName, dodoCode, swCode, reportedAt };

  return (
    <FormUI form={form} initialValues={initialValues}>
      <Form.Item label="岛主" name="playerName" rules={[{ required: true }]}>
        <Input disabled={true} placeholder={`在"设置“里填写`} />
      </Form.Item>
      <Form.Item label="岛名" name="islandName" rules={[{ required: true }]}>
        <Input disabled={true} placeholder={`在"设置“里填写`} />
      </Form.Item>
      <Form.Item label="好友编号" name="swCode" rules={[{ required: false }]}>
        <SWCodeInput disabled={true} placeholder={`在"设置“里填写`} />
      </Form.Item>
      <Form.Item label="萝卜报价" name="price" rules={[{ type: "number", min: 0, max: 9999 }, { required: true }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="记录时间" name="reportedAt" rules={[{ required: true }]}>
        <DatePicker showTime />
      </Form.Item>
    </FormUI>
  );
});

export const AddRecordModalForm = observer((props: ModalFormUIProps) => {
  const { priceRecordsStore, priceRecordsState } = useRootStore();
  const confirmLoading = priceRecordsStore.createRecordLoading;

  console.log(confirmLoading);

  const visible = priceRecordsState.addRecordFormVisible;

  const getFormComponent = (form: FormInstance) => <AddRecordModalInnerForm form={form} {...props} />;
  return (
    <ModalFormWrapper
      visible={visible}
      getFormComponent={getFormComponent}
      {...props}
      modalProps={{ confirmLoading }}
    />
  );
});
