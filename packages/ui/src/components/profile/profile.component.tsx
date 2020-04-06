import { decodeDto } from "@ansik/sdk/lib/utils";
import { ReplaceCurrentUserProfile } from "@turnip-market/dtos";
import _ from "lodash";
import { observer } from "mobx-react";
import moment from "moment-timezone";
import React, { PureComponent } from "react";
import { rootStoreContext } from "../../shared/rootStore";
import { computeTimeDiffInMinutes } from "../../shared/timeOffset.util";
import { ModalFormUIProps, TOnFormCreate } from "../common/modalForm.interface";
import { ProfileWrapper } from "./profile.ui";

@observer
export default class ProfileComponent extends PureComponent {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>;

  toggleProfileForm(visible: boolean): void {
    this.context.profileState.setProfileFormVisible(visible);
  }

  onProfileButtonClick = () => {
    this.toggleProfileForm(true);
  };

  onProfileFormCreate: TOnFormCreate = async (input, confirm) => {
    const localTimestamp = _.get(input, "localTimestamp");
    const timeDiff = localTimestamp?.isValid() && computeTimeDiffInMinutes(localTimestamp, moment());
    const isValidTimeDiff = _.isNumber(timeDiff) && !_.isNaN(timeDiff);
    const localTimeOffsetMinutes = isValidTimeDiff ? String(timeDiff) : null;

    const payload: ReplaceCurrentUserProfile.Request.Type = {
      settings: {
        playerName: _.get(input, "playerName", null),
        islandName: _.get(input, "islandName", null),
        localTimeOffsetMinutes,
        swCode: _.get(input, "swCode", null),
        dodoCode: _.get(input, "dodoCode", null),
      },
    };

    await this.context.profileStore.updateProfileSettings(decodeDto(ReplaceCurrentUserProfile.Request.dto, payload));
    this.toggleProfileForm(false);
    confirm();
  };

  onProfileFormCancel = () => {
    this.toggleProfileForm(false);
  };

  render() {
    const profileFormProps: ModalFormUIProps = {
      onCreate: this.onProfileFormCreate,
      onCancel: this.onProfileFormCancel,
    };

    return <ProfileWrapper profileForm={profileFormProps} />;
  }
}
