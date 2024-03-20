import React from "react";

import { Box, Stack, Typography } from "@mui/material";
interface StudentStatsCard {
  label1: string;
  value1: string;
  label2: boolean;
  value2: string;
}

const StudentStatsCard: React.FC<StudentStatsCard> = ({
  label1,
  value1,
  label2,
  value2,
}) => {
  return (
    <Box
      width="9rem"
      height="5rem"
      gap="1rem"
      border="1px solid #D0C5B4" //Add color from colorScheme
      borderRadius="1rem"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      bgcolor="white" 
      margin="0px"
      textAlign="left"
    >
      <Stack padding="1rem">
        <Typography
          fontSize="0.6875rem"
          fontWeight="bold"
          lineHeight="1rem"
          color="#1F1B13" //Add color from colorScheme
        >
          {label1}
        </Typography>
        <Typography
          fontSize="1.375rem"
          fontWeight="bold"
          lineHeight="1.75rem"
          color="#1F1B13" //Add color from colorScheme
        >
          {value1}
        </Typography>
        {label2 ? (
          <Typography
            fontSize="0.675rem"
            fontWeight="bold"
            lineHeight="1rem"
            color="#7C766F" //Add color from colorScheme
          >
            Held on: {value2}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  );
};

export default StudentStatsCard;
