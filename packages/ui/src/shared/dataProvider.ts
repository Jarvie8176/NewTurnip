import { decodeDto } from "@ansik/sdk/lib/utils";
import Axios, { AxiosInstance } from "axios";
import { action, observable, runInAction } from "mobx";
import { AuthTokenDecoder } from "../components/common/auth.dto";
import NotificationManager from "../components/notification/notificationManager";
import { Config } from "./config";

const Url: string = Config.API_URL;

/**
 * proxy of axios instance
 */
export class DataProviderStore {
  @observable shouldEndSession: boolean = false;

  @action setShouldEndSession(shouldEndSession: boolean) {
    this.shouldEndSession = shouldEndSession;
  }

  private readonly dataProvider: AxiosInstance;
  constructor() {
    this.dataProvider = Axios.create({
      baseURL: Url,
      timeout: 5000,
      headers: {},
    });

    // todo: refresh / logout logic
    this.dataProvider.interceptors.request.use((config) => {
      (() => {
        const accessToken = (() => {
          const serializedAuthToken = localStorage.getItem("AUTH_TOKEN");
          if (!serializedAuthToken) return;
          const authToken = decodeDto(AuthTokenDecoder, JSON.parse(serializedAuthToken));
          return authToken.accessToken;
        })();
        if (!accessToken) return;
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      })();
      return config;
    }, Promise.reject);
  }

  @action async sendRequest<T>(doRequest: (dataProvider: AxiosInstance) => T): Promise<T> {
    try {
      return await doRequest(this.dataProvider);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        NotificationManager.ShowError(new Error("session expired, please log-in"));
        await runInAction(() => this.setShouldEndSession(true));
      }
      throw err;
    }
  }
}

export const DataProvider = new DataProviderStore();
