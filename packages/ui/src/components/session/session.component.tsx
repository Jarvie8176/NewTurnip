import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useRootStore } from "../../shared/rootStore";

export const SessionControl = observer(() => {
  const { authStore, dataProviderStore } = useRootStore();
  const { shouldEndSession } = dataProviderStore;
  console.log(shouldEndSession);

  useEffect(() => {
    (async () => {
      if (dataProviderStore.shouldEndSession) {
        await authStore.logout();
        dataProviderStore.setShouldEndSession(false);
      }
    })();
  });

  return <div />;
});
