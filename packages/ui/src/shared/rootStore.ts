import { createContext, useContext } from "react";
import { AuthState } from "../components/auth/auth.state";
import { AuthStore } from "../components/auth/auth.store";
import { PriceRecordsState } from "../components/priceRecords/priceRecords.state";
import { PriceRecordsStore } from "../components/priceRecords/priceRecords.store";
import { ProfileState } from "../components/profile/profile.state";
import { ProfileStore } from "../components/profile/profile.store";
import { RoomState } from "../components/room/room.state";
import { RoomStore } from "../components/room/room.store";
import { DataProvider } from "./dataProvider";

export const RootStore = {
  authStore: new AuthStore(),
  authState: new AuthState(),
  priceRecordsStore: new PriceRecordsStore(),
  priceRecordsState: new PriceRecordsState(),
  profileStore: new ProfileStore(),
  profileState: new ProfileState(),
  roomStore: new RoomStore(),
  roomState: new RoomState(),
  dataProviderStore: DataProvider,
};

export const rootStoreContext = createContext(RootStore);
export const useRootStore = () => useContext(rootStoreContext);
