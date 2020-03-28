import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import React from "react";
import { Required } from "utility-types";

interface IProps extends Required<ButtonProps, "onClick"> {
  text: string;
}

export const AddPriceRecordButton = (props: IProps) => {
  return (
    <Button size={"middle"} shape={"round"} {...props}>
      {props.text}
    </Button>
  );
};
