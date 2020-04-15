import { Tooltip } from "antd";
import { observer } from "mobx-react";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
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
    rootStore.priceRecordsState.setActiveGraph("latest");
    rootStore.priceRecordsStore.setDataSource("all");
  },
  onPersonalPriceRecordsButtonClick: () => {
    rootStore.priceRecordsState.setActiveGraph("history");
    rootStore.priceRecordsStore.setDataSource("personal");
  },
  onPersonalPriceRecordsTrendsButtonClick: () => {
    rootStore.priceRecordsState.setActiveGraph("lineChart");
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  Button {
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
`;

export const ControlPanel = observer(() => {
  const rootStore = useRootStore();
  const controls = MakeControls(rootStore);
  const { t } = useTranslation();

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
          <ButtonUI
            text={t("buttons.latestPriceRecords")}
            onClick={controls.onAllPriceRecordsButtonClick}
            disabled={!shouldShow(true)}
          />
          <ButtonUI
            text={t("buttons.historicalPriceRecords")}
            onClick={controls.onPersonalPriceRecordsButtonClick}
            disabled={!shouldShow(true)}
          />
          <ButtonUI
            text={t("buttons.candlestickGraph")}
            onClick={controls.onPersonalPriceRecordsTrendsButtonClick}
            disabled={!shouldShow(true)}
          />
          <Tooltip title={t("buttons.pricePredictionWIPTooltip")}>
            <ButtonUI text={t("buttons.pricePrediction")} disabled={!shouldShow(true)} />
          </Tooltip>
        </ButtonContainer>
      </AuthenticationCheck>
      <AuthenticationCheck style={{ display: DisplayWhenAuthenticated(true) }}>
        <ButtonContainer>
          <ButtonUI type={"primary"} text={t("buttons.addPriceRecords")} onClick={controls.onAddRecordsButtonClick} />
          <ButtonUI text={t("buttons.refresh")} onClick={controls.onRefreshButtonClick} />
          <ButtonUI text={t("buttons.profileSettings")} onClick={controls.onProfileButtonClick} />
          <ButtonUI type={"danger"} text={t("buttons.logout")} onClick={controls.onLogoutButtonClick} />
        </ButtonContainer>
      </AuthenticationCheck>
      <AuthenticationCheck style={{ display: DisplayWhenAuthenticated(false) }}>
        <ButtonContainer>
          <ButtonUI text={t("buttons.register")} onClick={controls.onRegisterButtonClick} />
          <ButtonUI text={t("buttons.login")} onClick={controls.onLoginButtonClick} />
        </ButtonContainer>
      </AuthenticationCheck>
    </Fragment>
  );
});
