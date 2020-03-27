import { Button } from "antd";
import React from "react";

interface IProps {
  onClick: () => void;
}

export const AddRecordsButton = (props: IProps) => {
  const { onClick } = props;

  return (
    <Button type={"primary"} shape={"round"} onClick={onClick}>
      炒!
    </Button>
  );
};
