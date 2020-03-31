import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { useRootStore } from "../../shared/rootStore";
import { ModalFormInnerProps } from "../common/modalForm.interface";
import { ProfileButton } from "./profileButton.ui";
import { ProfileForm } from "./profileForm.ui";

interface IProps {
  onProfileButtonClick: () => void;
  profileForm: ModalFormInnerProps;
}

const ProfileContainer = styled.div``;

export const ProfileWrapper = observer((props: IProps) => {
  const { authStore } = useRootStore();
  const { authenticated } = authStore;
  return (
    <ProfileContainer style={{ display: !authenticated && "none" }}>
      <ProfileButton text={"设置"} onClick={props.onProfileButtonClick} />
      <ProfileForm style={{ maxWidth: "600px" }} {...props.profileForm} />
    </ProfileContainer>
  );
});
