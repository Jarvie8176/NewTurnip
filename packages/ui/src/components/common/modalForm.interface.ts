import { FormInstance, FormProps } from "antd/lib/form";
import { ModalProps } from "antd/lib/modal";

export interface ModalFormState {
  visible: boolean;
}

export interface FormUIProps extends FormProps {}

export interface ModalUIProps extends ModalFormState {
  onOk: ModalProps["onOk"];
  onCancel: ModalProps["onCancel"];
  form: FormInstance;
  children: JSX.Element;
}

export type TOnFormCreate = (input: {}, confirm: () => void) => Promise<unknown>;

export interface ModalFormInnerProps extends Omit<ModalUIProps, "children"> {
  onCreate: TOnFormCreate;
}

export interface ModalFormProps extends Omit<ModalFormInnerProps, "onOk"> {
  formComponent: JSX.Element;
  modalProps?: ModalProps;
  formProps?: FormProps;
}

export interface ModalFormWrapperProps extends Omit<ModalFormInnerProps, "form" | "onOk"> {
  getFormComponent: (form: FormInstance) => JSX.Element;
  modalProps?: ModalProps;
  formProps?: FormProps;
}

export interface ModalFormUIProps extends Omit<ModalFormInnerProps, "form" | "onOk"> {}

//import { FormInstance, FormProps } from "antd/lib/form";
//import { ModalProps } from "antd/lib/modal";
//
//export interface FormUIInnerFormProps extends FormProps {}
//

//
//interface FormUIControl {
//  onCreate: TOnFormCreate;
//}
//
//export interface FormUIProps extends FormProps, FormUIControl {
//  form: FormInstance;
//}
//
//export interface ModalUIState {
//  visible: ModalProps["visible"];
//}
//
//interface ModalUIControl {

//}
//
//export interface ModalUIProps extends ModalUIState, ModalUIControl {
//  form: FormInstance;
//  children: JSX.Element;
//}
//
//export interface ModalFormInnerProps extends FormUIProps {
//  form: FormInstance;
//}
//
//export interface ModalFormProps extends ModalFormInnerProps {
//  formComponent: JSX.Element;
//}
//
//export interface ModalFormUIProps extends ModalUIState, FormUIControl {
//  onCancel: ModalUIControl["onCancel"];
//}
//
//export interface ModalFormWrapperProps extends ModalFormInnerProps {
//  getFormComponent: (form: FormInstance) => JSX.Element;
//}
