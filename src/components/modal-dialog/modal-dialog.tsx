import { CSSProperties, FC } from 'react';

import { Modal } from '@mui/material';
import { ModalContainer } from './modal-dialog.jss';

interface IModalDialogProps {
  content: JSX.Element;
  isOpen: boolean;
  handleClose: () => void;
  style?: CSSProperties;
}

const ModalDialog: FC<IModalDialogProps> = ({ isOpen, content, handleClose, style }) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalContainer style={style}>{content}</ModalContainer>
    </Modal>
  );
};

export default ModalDialog;
