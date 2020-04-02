import { Tooltip } from "antd";
import { observer } from "mobx-react";
import React, { Fragment } from "react";
import styled from "styled-components";
import { RootStore, useRootStore } from "../../shared/rootStore";
import { AuthFormControl } from "../auth/auth.interfaces";
import { ButtonUI } from "../common/ButtonUI.ui";
import { PriceRecordsControl, PriceRecordsDataSourceControl } from "../priceRecords/priceRecords.interface";
import { ProfileControl } from "../profile/profile.interface";

interface IControl extends AuthFormControl, PriceRecordsControl, ProfileControl, PriceRecordsDataSourceControl {}

const MakeControls = (rootStore: typeof RootStore): IControl => ({
  onLoginButtonClick: () => {
    rootStore.authState.setLoginFormVisible(true);
  },
  onLogoutButtonClick: async () => {
    await rootStore.authStore.logout();
    await rootStore.profileStore.clear();
  },
  onRegisterButtonClick: () => {
    rootStore.authState.setRegisterFormVisible(true);
  },

  onAddRecordsButtonClick: () => {
    rootStore.priceRecordsState.setAddRecordFormVisible(true);
  },

  onRefreshButtonClick: async () => {
    await rootStore.priceRecordsStore.fetchAll();
  },

  onProfileButtonClick: () => {
    rootStore.profileState.setProfileFormVisible(true);
  },
  onAllPriceRecordsButtonClick: () => {
    rootStore.priceRecordsStore.setDataSource("all");
  },
  onPersonalPriceRecordsButtonClick: () => {
    rootStore.priceRecordsStore.setDataSource("personal");
  },
});

const AuthenticationCheck = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  Button {
    margin-left: 1em;
  }
`;

export const ControlPanel = observer(() => {
  const rootStore = useRootStore();
  const controls = MakeControls(rootStore);

  const { authenticated } = rootStore.authStore;

  const shouldShow = (show: boolean): boolean => {
    return (authenticated && show) || (!authenticated && !show);
  };

  const DisplayWhenAuthenticated = (show: boolean) => {
    return shouldShow(show) ? undefined : "none";
  };

  return (
    <Fragment>
      <AuthenticationCheck>
        <ButtonContainer>
          <ButtonUI text={"最新股价"} onClick={controls.onAllPriceRecordsButtonClick} disabled={!shouldShow(true)} />
          <ButtonUI
            text={"历史股价"}
            onClick={controls.onPersonalPriceRecordsButtonClick}
            disabled={!shouldShow(true)}
          />
          <Tooltip title={"在写了在写了"}>
            <ButtonUI text={"股价预测"} disabled={!shouldShow(true)} />
          </Tooltip>
        </ButtonContainer>
      </AuthenticationCheck>
      <AuthenticationCheck style={{ display: DisplayWhenAuthenticated(true) }}>
        <ButtonContainer>
          <ButtonUI type={"primary"} text={"炒!"} onClick={controls.onAddRecordsButtonClick} />
          <ButtonUI text={"刷新"} onClick={controls.onRefreshButtonClick} />
          <ButtonUI text={"设置"} onClick={controls.onProfileButtonClick} />
          <ButtonUI type={"danger"} text={"登出"} onClick={controls.onLogoutButtonClick} />
        </ButtonContainer>
      </AuthenticationCheck>
      <AuthenticationCheck style={{ display: DisplayWhenAuthenticated(false) }}>
        <ButtonContainer>
          <ButtonUI text={"注册"} onClick={controls.onRegisterButtonClick} />
          <ButtonUI text={"登录"} onClick={controls.onLoginButtonClick} />
        </ButtonContainer>
      </AuthenticationCheck>
    </Fragment>
  );
});
