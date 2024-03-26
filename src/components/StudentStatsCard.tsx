import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { Box, Stack, Typography } from '@mui/material';
interface StudentStatsCard {
  label1: string;
  value1: string;
  label2: boolean;
  value2: string;
}

const StudentStatsCard: React.FC<StudentStatsCard> = ({ label1, value1, label2, value2 }) => {
  const theme = useTheme<any>();
  const { t } = useTranslation();

  return (
    <Box
      width="9rem"
      height="auto"
      gap="1rem"
      border="1px solid #D0C5B4" //Add color from colorScheme
      borderRadius="1rem"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      bgcolor="white"
      margin="0px"
      textAlign="left">
      <Stack sx={{ padding: '1rem' }}>
        <Typography
          marginTop={'10px'}
          fontSize="11px"
          fontWeight={600}
          color="#7C766F" //Add color from colorScheme
          marginBottom={'0px'}>
          {label1}
        </Typography>
        <Typography
          fontSize="1.375rem"
          fontWeight={500}
          lineHeight="16px"
          color="#1F1B13" //Add color from colorScheme
          marginBottom={'5px'}>
          {value1}
        </Typography>
        {label2 ? (
          <Typography
            fontSize="0.675rem"
            fontWeight="bold"
            lineHeight="1rem"
            sx={{ color: theme.palette.warning['400'] }}
            marginBottom={'0px'}>
            {t('PROFILE.HELD_ON')}

            {value2}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  );
};

export default StudentStatsCard;
