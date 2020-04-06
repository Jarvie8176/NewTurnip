import { observer } from "mobx-react";
import React, { PureComponent } from "react";
import { rootStoreContext } from "../../shared/rootStore";
import { TOnFormCreate } from "../common/modalForm.interface";
import { CreateRoomWrapper } from "./createRoom.ui";

@observer
export class CreateRoomComponent extends PureComponent {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>;

  onRoomFormCreate: TOnFormCreate = async (input, _confirm) => {
    console.log(input);
  };

  onRoomFormCancel = (): void => {
    this.context.roomState.setCreateRoomFormVisible(false);
  };

  render() {
    return (
      <CreateRoomWrapper
        createRoomModalFormProps={{
          onCreate: this.onRoomFormCreate,
          onCancel: this.onRoomFormCancel,
        }}
      />
    );
  }
}
