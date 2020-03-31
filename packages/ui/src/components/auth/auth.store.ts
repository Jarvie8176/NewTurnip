import { decodeDto } from "@ansik/sdk/lib/utils";
import { CreateUser, Login } from "@turnip-market/dtos";
import { action, computed, observable, runInAction } from "mobx";
import { DataProvider } from "../../shared/dataProvider";
import { AuthToken, authTokenStorageLabel } from "./auth.interfaces";

export class AuthStore {
  @observable authToken?: AuthToken;
  @observable loading = false;

  @computed get authenticated() {
    return !!this.authToken;
  }

  @action async init(): Promise<void> {
    await runInAction(async () => this.loadAuthToken());
  }

  @action async register(input: CreateUser.Request.Type): Promise<void> {
    try {
      runInAction(() => (this.loading = true));
      const { data } = await DataProvider.post("/auth/register", input);
      const response = decodeDto(CreateUser.Response.dto, data);
      await runInAction(() => this.storeAuthToken(response.data));
    } finally {
      runInAction(() => (this.loading = false));
    }
  }

  @action async authenticate(input: Login.Request.Type): Promise<void> {
    try {
      runInAction(() => (this.loading = true));
      console.log("sending login request");
      const { data } = await DataProvider.post("/auth/login", input);
      const response = decodeDto(Login.Response.dto, data);
      await runInAction(() => this.storeAuthToken(response.data));
      console.log("login successful");
    } finally {
      runInAction(() => (this.loading = false));
    }
  }

  @action async logout(): Promise<void> {
    console.log("clear auth token");
    await this.storeAuthToken(undefined);
  }

  /**
   * updates the auth token in local storage
   * @param authToken
   */
  @action
  private async storeAuthToken(authToken?: AuthToken): Promise<void> {
    runInAction(() => (this.authToken = authToken));
    runInAction(() => {
      authToken
        ? localStorage.setItem(authTokenStorageLabel, JSON.stringify(authToken))
        : localStorage.removeItem(authTokenStorageLabel);
    });
  }

  @action
  private async loadAuthToken(): Promise<void> {
    console.log("load persisted auth token");
    const serializedAuthToken = localStorage.getItem(authTokenStorageLabel);
    if (!serializedAuthToken) return;
    const authToken = JSON.parse(serializedAuthToken);
    console.log("auth token retrieved");
    runInAction(() => (this.authToken = authToken));
    return authToken;
  }
}
