import { Button } from "antd";
import React from "react";
import { ButtonUIProps } from "./buttonUI.interface";

export const ButtonUI = (props: ButtonUIProps) => {
  return (
    <Button size={"middle"} shape={"round"} {...props}>
      {props.text}
    </Button>
  );
};
