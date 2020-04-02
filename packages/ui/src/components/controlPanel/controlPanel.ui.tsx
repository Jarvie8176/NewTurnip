import { Tooltip } from "antd";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { RootStore, useRootStore } from "../../shared/rootStore";
import { AuthFormControl } from "../auth/auth.interfaces";
import { ButtonUI } from "../common/ButtonUI.ui";
import { PriceRecordsControl } from "../priceRecords/priceRecords.interface";
import { ProfileControl } from "../profile/profile.interface";

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  Button {
    margin-left: 1em;
  }
`;

class Controls implements AuthFormControl, PriceRecordsControl, ProfileControl {
  constructor(private readonly rootStore: typeof RootStore) {}

  onLoginButtonClick = () => {
    this.rootStore.authState.setLoginFormVisible(true);
  };
  onLogoutButtonClick = async () => {
    await this.rootStore.authStore.logout();
    await this.rootStore.profileStore.clear();
  };
  onRegisterButtonClick = () => {
    this.rootStore.authState.setRegisterFormVisible(true);
  };

  onAddRecordsButtonClick = () => {
    this.rootStore.priceRecordsState.setAddRecordFormVisible(true);
  };

  onRefreshButtonClick = async () => {
    await this.rootStore.priceRecordsStore.fetchAll();
  };

  onProfileButtonClick = () => {
    this.rootStore.profileState.setProfileFormVisible(true);
  };
}

const Authenticated = styled.div``;
const UnAuthenticated = styled.div``;

export const ControlPanel = observer(() => {
  const rootStore = useRootStore();
  const controls = new Controls(rootStore);

  const { authenticated } = rootStore.authStore;

  const shouldShowWhenAuthenticated = (show: boolean) => {
    console.log(authenticated, show);
    const shouldShow = (authenticated && show) || (!authenticated && !show);
    return shouldShow ? undefined : "none";
  };

  return (
    <Wrapper>
      <Authenticated style={{ display: shouldShowWhenAuthenticated(true) }}>
        <ButtonUI type={"primary"} text={"炒!"} onClick={controls.onAddRecordsButtonClick} />
        <ButtonUI text={"刷新"} onClick={controls.onRefreshButtonClick} />
        <Tooltip title={"在写了在写了"}>
          <ButtonUI text={"历史股价"} />
        </Tooltip>
        <Tooltip title={"在写了在写了"}>
          <ButtonUI text={"股价预测"} />
        </Tooltip>
        <ButtonUI text={"设置"} onClick={controls.onProfileButtonClick} />
        <ButtonUI type={"danger"} text={"登出"} onClick={controls.onLogoutButtonClick} />
      </Authenticated>
      <UnAuthenticated style={{ display: shouldShowWhenAuthenticated(false) }}>
        <ButtonUI text={"注册"} onClick={controls.onRegisterButtonClick} />
        <ButtonUI text={"登录"} onClick={controls.onLoginButtonClick} />
      </UnAuthenticated>
    </Wrapper>
  );
});
