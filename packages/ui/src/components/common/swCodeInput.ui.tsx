import { Input } from "antd";
import { InputProps } from "antd/lib/input";
import { replace } from "lodash";
import React from "react";

export const SWCodeInput = (props: InputProps) => {
  let swCode: string = (props.value && String(props.value)) || "";
  const endsWithHyphen = swCode.slice(-1) === "-";

  swCode = replace(swCode, /-/g, "");

  if (swCode.length > 12) {
    console.warn("sw code has length > 12, trim to length of 12");
    swCode = swCode.slice(0, 12);
  }

  swCode = swCode.match(/.{1,4}/g)?.join("-") || "";

  if (endsWithHyphen) swCode += "-";

  return <Input defaultValue={swCode} placeholder={"0123-4567-8901"} {...props} value={swCode} />;
};
