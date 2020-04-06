import { ButtonProps } from "antd/lib/button";
import { ModalFormUIProps } from "../common/modalForm.interface";

export interface RoomControl {
  onCreateRoomButtonClick: () => void;
  onWaitingRoomButtonClick: () => void;
}
export interface CreateRoomControl {
  createRoomButtonProps?: ButtonProps;
  createRoomModalFormProps: ModalFormUIProps;
}

export interface RoomProps {
  roomId: string;
}
