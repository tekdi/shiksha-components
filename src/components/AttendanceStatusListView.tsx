import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { ATTENDANCE_ENUM } from '../utils/Helper';

import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; //present
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel'; //absent
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { AttendanceStatusListViewProps } from '../utils/Interfaces';

const AttendanceStatusListView: React.FC<AttendanceStatusListViewProps> = ({
  currentStatus,
  studentName,
  isEdit = false,
  isBulkAction = false,
  handleBulkAction = () => {}
}) => {
  const { t } = useTranslation();
  const [status, setStatus] = React.useState(currentStatus);
  const [markAllStatus, setMarkAllStatus] = React.useState('');
  const theme = useTheme<any>();

  const boxStyling = {
    display: 'flex',
    height: '56px',
    // width: '100%',
    borderBottom: `0.5px solid ${theme.palette.warning[400]}`,
    padding: '8px',
    alignItems: 'center',
    borderRadius: isBulkAction ? '8px' : 0,
    backgroundColor: isBulkAction ? theme.palette.warning[800] : 'none'
  };

  const handleClickAction = (selectedAction: string) => {
    if (isEdit) {
      if (isBulkAction) {
        handleBulkAction(selectedAction);
        setMarkAllStatus(selectedAction);
      } else {
        setStatus(selectedAction);
      }
    }
  };

  return (
    <Box sx={boxStyling}>
      <Typography variant="body1" marginRight="auto" marginY="auto">
        {studentName}
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
        onClick={() => handleClickAction(ATTENDANCE_ENUM.PRESENT)}
      >
        {[status, markAllStatus].includes(ATTENDANCE_ENUM.PRESENT) ? (
          <CheckCircleIcon />
        ) : (
          <CheckCircleOutlineIcon />
        )}
        <Typography variant="h6" marginTop={1} sx={{ color: () => theme.palette.warning[400] }}>
          {t('ATTENDANCE.PRESENT')}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
        onClick={() => handleClickAction(ATTENDANCE_ENUM.ABSENT)}
      >
        {[status, markAllStatus].includes(ATTENDANCE_ENUM.ABSENT) ? (
          <CancelIcon />
        ) : (
          <HighlightOffIcon />
        )}
        <Typography variant="h6" marginTop={1} sx={{ color: () => theme.palette.warning[400] }}>
          {t('ATTENDANCE.ABSENT')}
        </Typography>
      </Box>
    </Box>
  );
};

export default AttendanceStatusListView;
