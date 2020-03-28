import Axios from "axios";
import { Config } from "./config";

const Url: string = Config.API_URL;

export const DataProvider = Axios.create({
  baseURL: Url,
  timeout: 5000,
  headers: {},
});
