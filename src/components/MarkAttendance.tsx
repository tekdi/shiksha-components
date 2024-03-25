import * as React from 'react';
import { styled } from '@mui/material/styles';
//components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; //present
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel'; //absent
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'; //Half-Day
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
//colors
import { grey, amber } from '@mui/material/colors';
import { Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2)
  }
}));

const ATTENDANCE_ENUM = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  HALFDAY: 'HALF_DAY'
};

interface MarkAttendanceProps {}

const MarkAttendance: React.FC<MarkAttendanceProps> = ({}) => {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Mark Self Attendance
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Mark My Attendance
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box display="flex" flexDirection="row" justifyContent="space-around">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={2}
              onClick={() => setStatus(ATTENDANCE_ENUM.PRESENT)}
            >
              {status === ATTENDANCE_ENUM.PRESENT ? (
                <CheckCircleIcon />
              ) : (
                <CheckCircleOutlineIcon />
              )}
              <Typography marginTop={1}>Present</Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={2}
              onClick={() => setStatus(ATTENDANCE_ENUM.ABSENT)}
            >
              {status === ATTENDANCE_ENUM.ABSENT ? <CancelIcon /> : <CloseIcon />}
              <Typography marginTop={1}>Absent</Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={2}
              onClick={() => setStatus(ATTENDANCE_ENUM.HALFDAY)}
            >
              {status === ATTENDANCE_ENUM.HALFDAY ? (
                <RemoveCircleIcon />
              ) : (
                <RemoveCircleOutlineIcon />
              )}
              <Typography marginTop={1}>Half Day</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            autoFocus
            onClick={handleClose}
            disabled={status === ''}
            sx={{
              width: '100%',
              borderRadius: 8,
              color: grey[900],
              backgroundColor: amber[500]
            }}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default MarkAttendance;
