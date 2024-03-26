import ModalComponent from '../components/Modal.tsx';
import { useState } from 'react';
import { Button, TextField, Radio, Box, Grid } from '@mui/material';

const ModalUsage = () => {
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
  };

  const closeNestedModal = () => {
    setNestedModalOpen(false);
  };
  return (
    <>
      <Grid
        container
        display="flex"
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh', minWidth: '100%' }}
      >
        <Grid item>
          <Button onClick={handleOpenModal}>Open Modal</Button>
        </Grid>
      </Grid>
      <ModalComponent
        open={modalOpen}
        onClose={handleCloseModal}
        heading={'Mark attendance'}
        SubHeading={'date'}
        btnText="apply"
      >
        <TextField label="Input Field" variant="outlined" />
        <Box>
          <Radio checked={true} />
          <span>Option 1</span>
          <Radio />
          <span>Option 2</span>
        </Box>
        <Button onClick={openNestedModal}>Open Nested Modal</Button>
        <Button onClick={handleCloseModal}>Close</Button>
      </ModalComponent>

      {nestedModalOpen && (
        <ModalComponent
          open={nestedModalOpen}
          onClose={closeNestedModal}
          heading={'nested modal'}
          SubHeading={'subheading'}
          btnText="apply"
        >
          <TextField label="Input Field" variant="outlined" />
        </ModalComponent>
      )}
    </>
  );
};

export default ModalUsage;
