import { DatePicker, Form, Input, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react";
import React from "react";
import { useRootStore } from "../../shared/rootStore";
import { FormUIProps, ModalFormUIProps } from "../common/modalForm.interface";
import { FormUI, ModalFormWrapper } from "../common/modalForm.ui";

const AddRecordModalInnerForm = observer((props: FormUIProps) => {
  const { form } = props;

  return (
    <FormUI form={form}>
      <Form.Item label={"上岛密码"} name={"dodoCode"}>
        <Input />
      </Form.Item>
      <Form.Item label={"最大人数"} name={"capacity"} rules={[{ type: "number", min: 1, max: 8 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label={"开放时间"} name={"openAt"}>
        <DatePicker showTime />
      </Form.Item>
      <Form.Item label={"备注"} name={"notes"}>
        <TextArea maxLength={20} />
      </Form.Item>
    </FormUI>
  );

  //  const { profileStore } = useRootStore();
  //  const settings = profileStore.profileData?.profile.settings;
  //
  //  const playerName = settings?.playerName || null;
  //  const islandName = settings?.islandName || null;
  //  const swCode = settings?.swCode || null;
  //  const dodoCode = settings?.dodoCode || null;
  //  const reportedAt = moment();
  //
  //  const initialValues = { playerName, islandName, dodoCode, swCode, reportedAt };
  //
  //  return (
  //    <FormUI form={form} initialValues={initialValues}>
  //      <Form.Item label="岛主" name="playerName" rules={[{ required: true }]}>
  //        <Input disabled={true} placeholder={`在"设置“里填写`} />
  //      </Form.Item>
  //      <Form.Item label="岛名" name="islandName" rules={[{ required: true }]}>
  //        <Input disabled={true} placeholder={`在"设置“里填写`} />
  //      </Form.Item>
  //      <Form.Item label="好友编号" name="swCode" rules={[{ required: false }]}>
  //        <SWCodeInput disabled={true} placeholder={`在"设置“里填写`} />
  //      </Form.Item>
  //      <Form.Item label="萝卜报价" name="price" rules={[{ type: "number", min: 0, max: 9999 }, { required: true }]}>
  //        <InputNumber />
  //      </Form.Item>
  //      <Form.Item label="记录时间" name="reportedAt" rules={[{ required: true }]}>
  //          <DatePicker showTime />
  //      </Form.Item>
  //    </FormUI>
  //  );
});

export const CreateRoomModalForm = observer((props: ModalFormUIProps) => {
  const { roomState } = useRootStore();

  const visible = roomState.createRoomFormVisible;
  const confirmLoading = false;

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
