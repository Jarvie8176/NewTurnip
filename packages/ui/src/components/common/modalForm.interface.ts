import { FormInstance, FormProps } from "antd/lib/form";
import { ModalProps } from "antd/lib/modal";
import { Required } from "utility-types";

export type TOnFormCreate = (input: {}, confirm: () => void) => Promise<unknown>;

export interface ModalFormState extends Required<Omit<ModalProps, "onCancel">, "visible"> {}

export interface ModalFormControl {
  onCreate: TOnFormCreate;
  onCancel: ModalProps["onCancel"];
}

/**
 * includes callbacks
 */
export interface ModalFormInnerProps extends ModalFormState, ModalFormControl {}

export interface ModalFormProps extends ModalFormInnerProps {
  formInstance: FormInstance;
  formComponent: JSX.Element;
}

export interface FormUIProps extends FormProps {}
