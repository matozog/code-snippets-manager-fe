import { FC } from 'react';
import { Modal } from '@mui/material';
import { ModalDialogContent } from './modal-dialog.jss';

interface IModalDialogProps {
  content: JSX.Element;
  isOpen: boolean;
  handleClose: () => void;
}

const ModalDialog: FC<IModalDialogProps> = ({ isOpen, content, handleClose }) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalDialogContent>{content}</ModalDialogContent>
    </Modal>
  );
};

export default ModalDialog;
