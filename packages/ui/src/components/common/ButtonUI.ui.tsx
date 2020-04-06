import { Button } from "antd";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { ButtonUIProps } from "./buttonUI.interface";

export const ButtonUI = (props: ButtonUIProps) => {
  const linkTo = props.linkTo || "#";

  const LinkComponent = linkTo ? Link : Fragment;

  return (
    <LinkComponent to={linkTo}>
      <Button size={"middle"} shape={"round"} {...props}>
        {props.text}
      </Button>
    </LinkComponent>
  );
};
