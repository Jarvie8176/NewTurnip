import { createContext, useContext } from "react";
import { AuthStore } from "../components/auth/auth.store";
import { PriceRecordsStore } from "../components/priceRecords/priceRecords.store";

export const RootStore = {
  priceRecordsStore: new PriceRecordsStore(),
  authStore: new AuthStore(),
};

export const rootStoreContext = createContext(RootStore);
export const useRootStore = () => useContext(rootStoreContext);

RootStore.authStore.init().catch(console.error);
