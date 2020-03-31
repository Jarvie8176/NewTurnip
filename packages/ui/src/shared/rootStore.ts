import { createContext, useContext } from "react";
import { AuthStore } from "../components/auth/auth.store";
import { PriceRecordsStore } from "../components/priceRecords/priceRecords.store";
import { ProfileStore } from "../components/profile/profile.store";

export const RootStore = {
  priceRecordsStore: new PriceRecordsStore(),
  authStore: new AuthStore(),
  profileStore: new ProfileStore(),
};

export const rootStoreContext = createContext(RootStore);
export const useRootStore = () => useContext(rootStoreContext);

(async () => {
  await RootStore.authStore.init().catch(console.error);
})();
