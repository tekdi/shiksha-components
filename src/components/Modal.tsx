// import { useState } from 'react';
import { Modal, Typography, Box, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from './CustomButton';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  heading: string;
  SubHeading?: string;
  children?: React.ReactNode;
  btnText: string;
}

const ModalComponent: React.FC<ModalProps> = ({
  open,
  onClose,
  heading,
  SubHeading,
  children,
  btnText
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '1rem'
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h4">{heading}</Typography>
        <Box>
          <Typography variant="h6">{SubHeading}</Typography>
          <IconButton
            onClick={onClose}
            style={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <Box>{children}</Box>
        </Box>
        <CustomButton buttonText={'apply'} />
      </Box>
    </Modal>
  );
};

export default ModalComponent;
