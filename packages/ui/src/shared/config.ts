import { decodeDto } from "@ansik/sdk/lib/utils";
import { string } from "io-ts";

export const Config = {
  API_URL: decodeDto(string, process.env.REACT_APP_API_URL),
};
