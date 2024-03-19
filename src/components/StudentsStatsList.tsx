import React from "react";

import { Box, Link, Stack, Typography } from "@mui/material";
interface StudentsStatsListProps {
  name: string;
  label1: string;
  value1: string;
  label2: string;
  value2: string;
}

const StudentsStatsList: React.FC<StudentsStatsListProps> = ({
  name,
  label1,
  value1,
  label2,
  value2,
}) => {
  return (
    <Box
      width="100vw"
      height="4.5rem"
      gap="1rem"
      borderTop="1px solid #7F7667" //Add color from colorScheme
      borderBottom="1px solid #7F7667" //Add color from colorScheme
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderColor="#7F7667" //Add color from colorScheme
      margin="0px"
    >
      <Link
        href="#"
        underline="always"
        color="#000000" //Add color from colorScheme
        fontSize="0.875rem"
        fontWeight="400"
        lineHeight="1.25rem"
        padding="1rem"
      >
        {name}
      </Link>
      <Stack padding="1rem">
        <Typography
          fontSize="1rem"
          fontWeight="bold"
          lineHeight="1.5rem"
          color="black" //Add color from colorScheme
        >
          {value1}
        </Typography>
        <Typography
          fontSize="0.6875rem"
          fontWeight="500"
          lineHeight="1rem"
          color="#7F7667" //Add color from colorScheme
        >
          {label1}
        </Typography>
      </Stack>
      <Stack padding="1rem">
        <Typography
          fontSize="1rem"
          fontWeight="bold"
          lineHeight="1.5rem"
          color="black" //Add color from colorScheme
        >
          {value2}
        </Typography>
        <Typography
          fontSize="0.6875rem"
          fontWeight="500"
          lineHeight="1rem"
          color="#7F7667" //Add color from colorScheme
        >
          {label2}
        </Typography>
      </Stack>
    </Box>
  );
};

export default StudentsStatsList;