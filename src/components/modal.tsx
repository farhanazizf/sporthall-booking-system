import React from "react";
import { Modal } from "@mui/material";
import styled from "styled-components/macro";
import CloseIcon from "@mui/icons-material/Close";

interface ContainerProps {
  align?: string;
}

export interface ModalProps extends ContainerProps {
  visible: boolean;
  onDismiss: () => void;
  hideCloseIcon?: boolean;
  showBackdrop?: boolean;
}

export const Container = styled.section<ContainerProps>`
  position: relative;
  border-radius: 1rem;
  padding: 2.15rem 1.5rem 2rem;
  min-width: 50vw;
  max-width: 60vw;
  align-self: center;
  text-align: ${(props) => props.align};
  background: #fff;
`;

const CloseNow = styled(CloseIcon)`
  &&& {
    cursor: pointer;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
`;

const Modals: React.FC<ModalProps> = ({
  visible = false,
  onDismiss,
  align,
  hideCloseIcon,
  children,
}) => {
  return (
    <Modal
      open={visible}
      onClose={onDismiss}
      onBackdropClick={onDismiss}
      style={{
        display: "flex",
        alignSelf: "flex-start",
        justifyContent: "center",
      }}
    >
      <Container align={align}>
        {hideCloseIcon ? null : <CloseNow onClick={onDismiss} />}

        {children}
      </Container>
    </Modal>
  );
};

export default Modals;
