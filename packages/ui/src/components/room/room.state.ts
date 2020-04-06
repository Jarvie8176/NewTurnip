import { action, observable } from "mobx";

export class RoomState {
  @observable createRoomFormVisible: boolean = false;

  @action setCreateRoomFormVisible(visible: boolean): void {
    this.createRoomFormVisible = visible;
  }
}
