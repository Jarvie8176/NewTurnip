import React from "react";
import styled from "styled-components";
import { ModalFormUIProps } from "../common/modalForm.interface";
import { ProfileModalForm } from "./profileForm.ui";

interface IProps {
  profileForm: ModalFormUIProps;
}

const PriceModalFormContainer = styled.div`
  max-width: 600px;
`;

export const ProfileWrapper = (props: IProps) => {
  return (
    <PriceModalFormContainer>
      <ProfileModalForm {...props.profileForm} />
    </PriceModalFormContainer>
  );
};
