import { DatePicker, Form, Input } from "antd";
import { observer } from "mobx-react";
import moment from "moment-timezone";
import React from "react";
import { useRootStore } from "../../shared/rootStore";
import { ModalFormInnerProps } from "../common/modalForm.interface";
import { createModalForm, FormUI } from "../common/modalForm.ui";
import { SWCodeInput } from "../common/swCodeInput.ui";

export const ProfileForm = observer((props: ModalFormInnerProps) => {
  const { profileStore } = useRootStore();
  const { confirmLoading, profileData } = profileStore;

  const [formInstance] = Form.useForm();

  const settings = profileData?.profile.settings;

  const localTimeOffsetMinutes = profileData?.profile.settings.localTimeOffsetMinutes || 0;

  const playerName = settings?.playerName || null;
  const islandName = settings?.islandName || null;

  const localTimestamp = moment().add(localTimeOffsetMinutes, "minutes").subtract(moment().utcOffset(), "minutes");
  if (localTimeOffsetMinutes > 0) localTimestamp.add(1, "minutes");
  const swCode = settings?.swCode || null;
  const dodoCode = settings?.dodoCode || null;

  const formComponent = (
    <FormUI form={formInstance} initialValues={{ playerName, islandName, localTimestamp, swCode, dodoCode }}>
      <Form.Item label="岛主" name="playerName" rules={[]}>
        <Input />
      </Form.Item>
      <Form.Item label="岛名" name="islandName" rules={[]}>
        <Input />
      </Form.Item>
      <Form.Item label="当前岛上时间" name="localTimestamp" rules={[]}>
        <DatePicker style={{ width: "100%" }} showTime format={"YYYY-MM-DD hh:mm A"} />
      </Form.Item>
      <Form.Item label="好友编号" name="swCode" rules={[]}>
        <SWCodeInput />
      </Form.Item>
      <Form.Item label="机场密码" name="dodoCode" rules={[]}>
        <Input />
      </Form.Item>
    </FormUI>
  );
  return createModalForm({ confirmLoading, formInstance, formComponent, ...props });
});
