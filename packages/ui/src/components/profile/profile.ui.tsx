import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { useRootStore } from "../../shared/rootStore";
import { ModalFormUIProps } from "../common/modalForm.interface";
import { ProfileButton } from "./profileButton.ui";
import { ProfileModalForm } from "./profileForm.ui";

interface IProps {
  onProfileButtonClick: () => void;
  profileForm: ModalFormUIProps;
}

const ProfileContainer = styled.div``;

const PriceModalFormContainer = styled.div`
  max-width: 600px;
`;

export const ProfileWrapper = observer((props: IProps) => {
  const { authStore } = useRootStore();
  const { authenticated } = authStore;
  return (
    <ProfileContainer style={{ display: !authenticated && "none" }}>
      <ProfileButton text={"设置"} onClick={props.onProfileButtonClick} />
      <PriceModalFormContainer>
        <ProfileModalForm {...props.profileForm} />
      </PriceModalFormContainer>
    </ProfileContainer>
  );
});
