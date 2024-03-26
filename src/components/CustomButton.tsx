import React from 'react';
import Button from '@mui/material/Button';

interface CustomButtonProps {
  buttonText: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ buttonText }) => {
  return (
    <Button
      variant="contained"
      style={{
        width: 'auto',
        height: 'auto',
        left: 'calc(50% - 164px)',
        background: '#FBBC13',
        borderRadius: 100
      }}
    >
      {buttonText}
    </Button>
  );
};

export default CustomButton;
