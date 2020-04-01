import { decodeDto } from "@ansik/sdk/lib/utils";
import { GetCurrentUserProfile, ReplaceCurrentUserProfile } from "@turnip-market/dtos";
import { action, observable, runInAction } from "mobx";
import { DataProvider } from "../../shared/dataProvider";
import { CurrentUserProfileDto } from "./profile.dto";

export class ProfileStore {
  @observable dataLoading = false;
  @observable confirmLoading = false;
  @observable profileData?: CurrentUserProfileDto;

  @action async updateProfileSettings(profile: ReplaceCurrentUserProfile.Request.Type): Promise<void> {
    console.log(profile);
    try {
      runInAction(() => (this.confirmLoading = true));
      const { data } = await DataProvider.put("/profiles/me", profile);
      const response = decodeDto(ReplaceCurrentUserProfile.Response.dto, data);
      const profileData = response.data;
      runInAction(() => (this.profileData = profileData));
      console.log("user profile updated to:", profileData);
    } finally {
      runInAction(() => (this.confirmLoading = false));
    }
  }

  @action async loadCurrentUserProfile(): Promise<void> {
    try {
      runInAction(() => (this.confirmLoading = true));
      console.log("loading current user profile");
      const { data } = await DataProvider.get("/profiles/me");
      const response = decodeDto(GetCurrentUserProfile.Response.dto, data);
      const profileData = response.data;
      runInAction(() => (this.profileData = profileData));
      console.log("user profile updated to:", profileData);
    } finally {
      runInAction(() => (this.confirmLoading = false));
    }
  }

  @action async clear(): Promise<void> {
    runInAction(() => (this.profileData = undefined));
  }
}
