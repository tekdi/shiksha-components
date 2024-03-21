import React from "react";
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme<any>();

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
      margin="0px"
      textAlign="left"
    >
      <Stack padding="1rem">
        <Typography
          fontSize="0.6875rem"
          fontWeight="bold"
          lineHeight="1rem"
          sx={{color: theme.palette.warning["300"]}}
        >
          {label1}
        </Typography>
        <Typography
          fontSize="1.375rem"
          fontWeight="bold"
          lineHeight="1.75rem"
          sx={{color: theme.palette.warning["300"]}}
        >
          {value1}
        </Typography>
        {label2 ? (
          <Typography
            fontSize="0.675rem"
            fontWeight="bold"
            lineHeight="1rem"
            sx={{color: theme.palette.warning["400"]}}
          >
            Held on: {value2}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  );
};

export default StudentStatsCard;
