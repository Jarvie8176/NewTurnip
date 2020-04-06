import { action, observable } from "mobx";

export class RoomStore {
  @observable roomId?: string;

  @action async loadRoom(roomId: string): Promise<void> {
    this.roomId = roomId;
  }
}
