import { DatePicker, Form, Input } from "antd";
import { FormInstance } from "antd/lib/form";
import { observer } from "mobx-react";
import moment from "moment-timezone";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRootStore } from "../../shared/rootStore";
import { FormUIProps, ModalFormUIProps } from "../common/modalForm.interface";
import { FormUI, ModalFormWrapper } from "../common/modalForm.ui";
import { SWCodeInput } from "../common/swCodeInput.ui";

const ProfileModalFormInnerForm = (props: FormUIProps) => {
  const { form } = props;

  const { profileStore } = useRootStore();
  const { profileData } = profileStore;

  const { t } = useTranslation();

  const localTimeOffsetMinutes = profileData?.profile.settings.localTimeOffsetMinutes || 0;
  const localTimestamp = moment().add(localTimeOffsetMinutes, "minutes").subtract(moment().utcOffset(), "minutes");
  if (localTimeOffsetMinutes > 0) localTimestamp.add(1, "minutes");

  const settings = profileData?.profile.settings;
  const playerName = settings?.playerName || null;
  const islandName = settings?.islandName || null;
  const swCode = settings?.swCode || null;
  const dodoCode = settings?.dodoCode || null;

  const initialValues = { playerName, islandName, localTimestamp, swCode, dodoCode };

  return (
    <FormUI form={form} initialValues={initialValues}>
      <Form.Item label={t("profilesForm.islandName")} name="playerName" rules={[]}>
        <Input />
      </Form.Item>
      <Form.Item label={t("profilesForm.playerName")} name="islandName" rules={[]}>
        <Input />
      </Form.Item>
      <Form.Item label={t("profilesForm.currentTime")} name="localTimestamp" rules={[]}>
        <DatePicker style={{ width: "100%" }} showTime format={"YYYY-MM-DD hh:mm A"} />
      </Form.Item>
      <Form.Item label={t("profilesForm.swCode")} name="swCode" rules={[]}>
        <SWCodeInput />
      </Form.Item>
      <Form.Item label={t("profilesForm.dodoCode")} name="dodoCode" rules={[]}>
        <Input />
      </Form.Item>
    </FormUI>
  );
};

export const ProfileModalForm = observer((props: ModalFormUIProps) => {
  const { profileStore, profileState } = useRootStore();
  const visible = profileState.profileFormVisible;
  const confirmLoading = profileStore.confirmLoading;

  const getFormComponent = (form: FormInstance) => <ProfileModalFormInnerForm form={form} {...props} />;
  return (
    <ModalFormWrapper
      visible={visible}
      modalProps={{ confirmLoading }}
      getFormComponent={getFormComponent}
      {...props}
    />
  );
});
