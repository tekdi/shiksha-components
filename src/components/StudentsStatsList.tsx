import React from 'react';

import { Box, Grid, Link, Pagination, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
interface StudentsStatsListProps {
  name: string;
  label1: string;
  value1: number;
  label2: string;
  value2: number;
  userId?: string;
  cohortId?: string;
}

const StudentsStatsList: React.FC<StudentsStatsListProps> = ({
  name,
  label1,
  value1,
  label2,
  value2,
  userId,
  cohortId
}) => {
  const theme = useTheme<any>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleStudentDetails = () => {
    navigate(`/student-details/${cohortId}/${userId}`);
  };

  return (
    <Stack>
      <Box
        height="60px"
        borderTop={`1px solid  ${theme.palette.warning['300']}`}
        margin="0px"
        alignItems={'center'}
        // padding="1rem"
      >
        <Grid container alignItems="center" justifyContent="space-between" p={2}>
          <Grid item xs={10}>
            <Link
              underline="always"
              color={theme.palette.text.primary}
              fontSize="0.875rem"
              fontWeight="400"
              lineHeight="1.25rem"
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}>
              <Typography m={0} onClick={handleStudentDetails}>
                {name}
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={2}>
            <Typography
              m={0}
              fontSize="1rem"
              fontWeight="bold"
              lineHeight="1.5rem"
              color={theme.palette.text.primary}
              textAlign="center">
              {value1}%
            </Typography>
            <Typography
              m={0}
              fontSize="0.6875rem"
              fontWeight="500"
              lineHeight="1rem"
              color={theme.palette.warning.main}
              textAlign="center">
              {t('COMMON.ATTENDANCE')}
            </Typography>
          </Grid>
          {/* -------------------- code commented as per requirement -------------------
         <Grid item xs={3}>
          <Typography
            m={0}
            fontSize="1rem"
            fontWeight="bold"
            lineHeight="1.5rem"
            color={theme.palette.text.primary}
            textAlign="center">
            {value2}
          </Typography>
          <Typography
            m={0}
            fontSize="0.6875rem"
            fontWeight="500"
            lineHeight="1rem"
            color={theme.palette.warning.main}
            textAlign="center">
            Class Missed
          </Typography>
        </Grid> */}
        </Grid>
      </Box>
    </Stack>
  );
};

export default StudentsStatsList;