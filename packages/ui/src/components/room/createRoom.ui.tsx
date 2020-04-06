import React, { Fragment } from "react";
import { CreateRoomModalForm } from "./createRoomForm.ui";
import { CreateRoomControl } from "./room.interface";

export const CreateRoomWrapper = (props: CreateRoomControl) => {
  const { createRoomModalFormProps } = props;
  return (
    <Fragment>
      <CreateRoomModalForm {...createRoomModalFormProps} />
    </Fragment>
  );
};
