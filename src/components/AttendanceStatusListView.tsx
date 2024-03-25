import React from 'react';
import { useTheme } from '@mui/material/styles';

import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; //present
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel'; //absent
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ATTENDANCE_ENUM = {
  PRESENT: "present",
  ABSENT: "absent",
  HALF_DAY: "halfday",
  NOT_MARKED: "notmarked"
}

interface AttendanceStatusListViewProps {
  currentStatus: string;
  studentName: string;
}

const AttendanceStatusListView: React.FC<AttendanceStatusListViewProps> = ({
  currentStatus,
  studentName
}) => {
  const [status, setStatus] = React.useState(currentStatus);
  const theme = useTheme<any>();

  const boxStyling = {
    display: 'flex',
    height: "56px",
    width: "100%",
    borderBottom: `0.5px solid ${theme.palette.warning[400]}`,
    padding: "8px",
    alignItems: 'center',
  }

  return (
    <Box sx={boxStyling}>
      <Typography variant="body1" marginRight="auto">{studentName}</Typography>
      <Box display="flex" flexDirection="column" alignItems="center" p={2} onClick={()=>setStatus(ATTENDANCE_ENUM.PRESENT)}>
        {status === ATTENDANCE_ENUM.PRESENT ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
        <Typography variant='h6' marginTop={1} sx={{color:()=>theme.palette.warning[400]}}>Present</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" p={2} onClick={()=>setStatus(ATTENDANCE_ENUM.ABSENT)}>
        {status === ATTENDANCE_ENUM.ABSENT ? <CancelIcon /> : <HighlightOffIcon />}
        <Typography variant='h6' marginTop={1} sx={{color:()=>theme.palette.warning[400]}}>Absent</Typography>
      </Box>
    </Box>
  );
};

export default AttendanceStatusListView;
