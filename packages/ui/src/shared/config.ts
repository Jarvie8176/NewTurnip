import { decodeDto } from "@ansik/sdk/lib/utils";
import { string } from "io-ts";

export const Config = {
  API_URL: decodeDto(string, process.env.REACT_APP_API_URL),
  GA_TRACKER_TAG: decodeDto(string, process.env.REACT_APP_GA_TRACKER_TAG),
  SLACK_WORKSPACE_LINK: decodeDto(string, process.env.REACT_APP_SLACK_WORKSPACE_LINK),
};
