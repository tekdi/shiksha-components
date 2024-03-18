import ModalComponent from "./components/Modal.tsx";
import { useState } from "react";
import { Button, TextField, Radio, Box } from "@mui/material";
import CustomButton from "./components/CustomButton.tsx";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [nestedModalOpen, setNestedModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const openNestedModal = () => {
    setNestedModalOpen(true);
  }

  const closeNestedModal = () => {
    setNestedModalOpen(false);
  }

  return (
    <>
      <Button onClick={handleOpenModal}>Open Modal</Button>
      <ModalComponent open={modalOpen} onClose={handleCloseModal} heading={'Mark attendance'} SubHeading={'date'} btnText="apply">
        <TextField label="Input Field" variant="outlined" />
        <Box>
          <Radio checked={true} />
          <span>Option 1</span>
          <Radio />
          <span>Option 2</span>
        </Box>
        <Button onClick={openNestedModal}>Open Nested Modal</Button>
        <Button onClick={handleCloseModal}>Close</Button>
      </ModalComponent >

      {nestedModalOpen && (
        <ModalComponent open={nestedModalOpen} onClose={closeNestedModal} heading={'nested modal'} SubHeading={'subheading'} btnText="apply">
          <TextField label="Input Field" variant="outlined" />
        </ModalComponent>
      )}
    </>
  )
}

export default App
