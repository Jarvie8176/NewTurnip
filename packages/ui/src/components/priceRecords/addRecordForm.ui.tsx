import { DatePicker, Form, Input, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form";
import { observer } from "mobx-react";
import moment from "moment-timezone";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRootStore } from "../../shared/rootStore";
import { FormUIProps, ModalFormUIProps } from "../common/modalForm.interface";
import { FormUI, ModalFormWrapper } from "../common/modalForm.ui";
import { SWCodeInput } from "../common/swCodeInput.ui";

const AddRecordModalInnerForm = observer((props: FormUIProps) => {
  const { form } = props;

  const { profileStore } = useRootStore();
  const { t } = useTranslation();
  const settings = profileStore.profileData?.profile.settings;

  const playerName = settings?.playerName || null;
  const islandName = settings?.islandName || null;
  const swCode = settings?.swCode || null;
  const dodoCode = settings?.dodoCode || null;
  const reportedAt = moment();

  const initialValues = { playerName, islandName, dodoCode, swCode, reportedAt };

  const placeholderText = t("addPriceRecordForm.inputFieldPlaceholder");

  return (
    <FormUI form={form} initialValues={initialValues}>
      <Form.Item label={t("addPriceRecordForm.playerName")} name="playerName" rules={[{ required: true }]}>
        <Input disabled={true} placeholder={placeholderText} />
      </Form.Item>
      <Form.Item label={t("addPriceRecordForm.islandName")} name="islandName" rules={[{ required: true }]}>
        <Input disabled={true} placeholder={placeholderText} />
      </Form.Item>
      <Form.Item label={t("addPriceRecordForm.fcCode")} name="swCode" rules={[{ required: false }]}>
        <SWCodeInput disabled={true} placeholder={placeholderText} />
      </Form.Item>
      <Form.Item
        label={t("addPriceRecordForm.price")}
        name="price"
        rules={[{ type: "number", min: 0, max: 9999 }, { required: true }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item label={t("addPriceRecordForm.recordTime")} name="reportedAt" rules={[{ required: true }]}>
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
