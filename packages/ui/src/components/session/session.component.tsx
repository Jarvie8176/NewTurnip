import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useRootStore } from "../../shared/rootStore";
import NotificationManager from "../notification/notificationManager";

export const SessionControl = observer(() => {
  const { authStore, profileStore, dataProviderStore } = useRootStore();
  const { shouldEndSession } = dataProviderStore;

  useEffect(() => {
    (async () => {
      await authStore.init();
      if (!authStore.authenticated) return;
      await profileStore.loadCurrentUserProfile();
    })().catch(NotificationManager.ShowError);
  }, [authStore, profileStore]);

  useEffect(() => {
    (async () => {
      if (!shouldEndSession) return;

      await authStore.logout();
      dataProviderStore.setShouldEndSession(false);
    })().catch(NotificationManager.ShowError);
  }, [shouldEndSession, authStore, dataProviderStore]);

  return <div />;
});
