import { decodeDto } from "@ansik/sdk/lib/utils";
import Axios from "axios";
import { AuthTokenDecoder } from "../components/common/auth.dto";
import { Config } from "./config";

const Url: string = Config.API_URL;

export const DataProvider = Axios.create({
  baseURL: Url,
  timeout: 5000,
  headers: {},
});

// todo: refresh / logout logic
DataProvider.interceptors.request.use((config) => {
  const authToken = (() => {
    const serializedAuthToken = localStorage.getItem("AUTH_TOKEN");
    if (!serializedAuthToken) return;
    const authToken = decodeDto(AuthTokenDecoder, JSON.parse(serializedAuthToken));
    return authToken.accessToken;
  })();
  if (authToken) config.headers["Authorization"] = `Bearer ${authToken}`;
  return config;
}, Promise.reject);
