import { makeUuid } from "@ansik/sdk/lib/utils";
import { List } from "antd";
import { observer } from "mobx-react";
import React, { Fragment } from "react";
import styled from "styled-components";
import { ButtonUI } from "../common/ButtonUI.ui";

const RoomContainer = styled.div``;

export const RoomWrapper = observer(() => {
  const data = [makeUuid(), makeUuid(), makeUuid(), makeUuid(), makeUuid(), makeUuid(), makeUuid()];

  return (
    <Fragment>
      <RoomContainer>
        <List
          header={`正在排队：${data.length}`}
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>${item}</List.Item>}
        />
        <ButtonUI text={"下岛"} />
      </RoomContainer>
    </Fragment>
  );
});
