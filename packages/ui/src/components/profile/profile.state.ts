import { action, observable } from "mobx";
import { IProfileState } from "./profile.interface";

export class ProfileState implements IProfileState {
  @observable profileFormVisible: boolean = false;

  @action setProfileFormVisible(visible: boolean) {
    this.profileFormVisible = visible;
  }
}
