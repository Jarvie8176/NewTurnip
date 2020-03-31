import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import React from "react";

interface IProps extends ButtonProps {
  text: string;
}

export const ProfileButton = (props: IProps) => (
  <Button size={"middle"} shape={"round"} {...props}>
    {props.text}
  </Button>
);
