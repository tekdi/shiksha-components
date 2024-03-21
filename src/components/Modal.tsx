// import { useState } from 'react';
import { Modal, Typography, Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "./CustomButton";
import ButtonFunctional from "./ButtonFunctional";

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
  btnText,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "1rem",
  };

  const handleApplyClickButton = () => {
    alert("Handle Sort Data");
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* <Typography>{heading}</Typography> */}
        <Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography
              style={{ position: "absolute", top: 5, left: 7, zIndex: 1 }}
            >
              {SubHeading}
            </Typography>
          </Box>
          <Box>{children}</Box>
        </Box>
        <ButtonFunctional
          handleClickButton={handleApplyClickButton}
          buttonName="Apply"
        />
      </Box>
    </Modal>
  );
};

export default ModalComponent;
