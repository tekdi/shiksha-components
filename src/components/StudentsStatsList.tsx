import React from "react";

import { Box, Link, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
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
  const theme = useTheme<any>();
  return (
    <Box
      // width="100vw"
      height="73px"
      // gap="1rem"
      borderTop="1px solid #7F7667" //Add color from colorScheme
      // borderBottom="1px solid #7F7667" //Add color from colorScheme
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ borderColor: theme.palette.warning["200"] }}
      margin="0px"
    >
      <Box>
        {" "}
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
      </Box>
      <Box display={"flex"} gap={9} m={2}>
        <Stack m={0}>
          <Typography
            marginBottom={0}
            fontSize="16px"
            fontWeight="500"
            lineHeight="24px"
            color="black" //Add color from colorScheme
            fontFamily={"Poppins"}
          >
            {value1} %
          </Typography>
          <Typography
            marginBottom={0}
            fontSize="11px"
            fontWeight="500"
            lineHeight="1rem"
            color="#7F7667" //Add color from colorScheme
            fontFamily="Poppins"
          >
            {label1}
          </Typography>
        </Stack>
        <Stack>
          <Typography
            marginBottom={0}
            fontSize="16px"
            fontWeight="500"
            lineHeight="1.5rem"
            color="black" //Add color from colorScheme
            fontFamily="Poppins"
          >
            {value2}
          </Typography>
          <Typography
            marginBottom={0}
            fontSize="11px"
            fontWeight="500"
            lineHeight="1rem"
            color="#7F7667" //Add color from colorScheme
            fontFamily="Poppins"
          >
            {label2}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default StudentsStatsList;
