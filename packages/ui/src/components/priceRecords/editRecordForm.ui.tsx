import { DatePicker, Form, Input, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form";
import { observer } from "mobx-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRootStore } from "../../shared/rootStore";
import { FormUIProps, ModalFormUIProps } from "../common/modalForm.interface";
import { FormUI, ModalFormWrapper } from "../common/modalForm.ui";
import { SWCodeInput } from "../common/swCodeInput.ui";

const EditRecordModalInnerForm = observer((props: FormUIProps) => {
  const { form } = props;

  const { priceRecordsStore } = useRootStore();
  const { t } = useTranslation();
  const defaultValues = priceRecordsStore.editPriceRecordDefaultValues;

  const id = defaultValues?.id;
  const playerName = defaultValues?.playerName;
  const islandName = defaultValues?.islandName;
  const swCode = defaultValues?.swCode;
  const reportedAt = defaultValues?.reportedAt;
  const price = defaultValues?.price;

  const initialValues = { id, playerName, islandName, swCode, reportedAt, price };

  const placeholderText = t("addPriceRecordForm.inputFieldPlaceholder");

  return (
    <FormUI form={form} initialValues={initialValues}>
      <Form.Item name="id" rules={[{ required: true }]} style={{ display: "none" }}>
        <Input disabled={true} placeholder={placeholderText} />
      </Form.Item>
      <Form.Item label={t("addPriceRecordForm.playerName")} name="playerName" rules={[{ required: true }]}>
        <Input disabled={true} placeholder={placeholderText} />
      </Form.Item>
      <Form.Item label={t("addPriceRecordForm.islandName")} name="islandName" rules={[{ required: true }]}>
        <Input disabled={true} placeholder={placeholderText} />
      </Form.Item>
      <Form.Item label={t("addPriceRecordForm.swCode")} name="swCode" rules={[{ required: false }]}>
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

export const EditRecordModalForm = observer((props: ModalFormUIProps) => {
  const { priceRecordsStore, priceRecordsState } = useRootStore();
  const confirmLoading = priceRecordsStore.editRecordLoading;

  console.log(confirmLoading);

  const visible = priceRecordsState.editRecordFormVisible;

  const getFormComponent = (form: FormInstance) => <EditRecordModalInnerForm form={form} {...props} />;
  return (
    <ModalFormWrapper
      visible={visible}
      getFormComponent={getFormComponent}
      {...props}
      modalProps={{ confirmLoading }}
    />
  );
});
