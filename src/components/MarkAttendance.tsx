import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { ATTENDANCE_ENUM, formatDate } from '../utils/Helper';
//components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//icons
import { Icon } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; //present
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel'; //absent
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'; //Half-Day
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { MarkAttendanceProps } from '../utils/Interfaces';

// Define a type for the icon prop
type IconType = React.ReactElement<typeof Icon>;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2)
  }
}));

const MarkAttendance: React.FC<MarkAttendanceProps> = ({
  isOpen,
  isSelfAttendance = true,
  date,
  name,
  currentStatus,
  handleClose,
  handleSubmit
}) => {
  const { t } = useTranslation();
  const [status, setStatus] = React.useState(currentStatus);
  const theme = useTheme<any>();

  const submitAttendance = () => {
    handleSubmit(date, status);
  };

  const getButtonComponent = (value: string, icon1: IconType, icon2: IconType, text: string) => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
        onClick={() => setStatus(value)}
      >
        {status === value ? icon1 : icon2}
        <Typography marginTop={1}>{text}</Typography>
      </Box>
    );
  };
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        sx={{ borderRadius: '16px' }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="h2" sx={{ marginBottom: 0 }}>
            {currentStatus === ATTENDANCE_ENUM.NOT_MARKED
              ? t('COMMON.MARK_ATTENDANCE')
              : t('COMMON.UPDATE_ATTENDANCE')}
          </Typography>
          <Typography variant="h4" sx={{ marginBottom: 0, color: theme.palette.warning['A200'] }}>
            {formatDate(date)}
          </Typography>
        </DialogTitle>
        {/* <Typography variant="h2">Mark Attendance</Typography> */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.warning['A200']
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center">
            {!isSelfAttendance && <Typography variant="body1">{name}</Typography>}
            {getButtonComponent(
              ATTENDANCE_ENUM.PRESENT,
              <CheckCircleIcon />,
              <CheckCircleOutlineIcon />,
              t('ATTENDANCE.PRESENT')
            )}
            {getButtonComponent(
              isSelfAttendance ? ATTENDANCE_ENUM.ON_LEAVE : ATTENDANCE_ENUM.ABSENT,
              <CancelIcon />,
              <HighlightOffIcon />,
              isSelfAttendance ? t('ATTENDANCE.ON_LEAVE') : t('ATTENDANCE.ABSENT')
            )}
            {isSelfAttendance &&
              getButtonComponent(
                ATTENDANCE_ENUM.HALF_DAY,
                <RemoveCircleIcon />,
                <RemoveCircleOutlineIcon />,
                t('ATTENDANCE.HALF_DAY')
              )}
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button
                        variant="outlined"
                        autoFocus
                        onClick={handleClose}
                        sx={{
                            width: '100%',
                            display: currentStatus === ATTENDANCE_ENUM.NOT_MARKED ? 'none' : 'block'
                        }}
                    >
                        Clear
                    </Button> */}
          <Button
            variant="contained"
            onClick={submitAttendance}
            disabled={status === ATTENDANCE_ENUM.NOT_MARKED || status === currentStatus}
            sx={{
              width: '100%'
            }}
          >
            {currentStatus === ATTENDANCE_ENUM.NOT_MARKED ? t('COMMON.SAVE') : t('COMMON.UPDATE')}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default MarkAttendance;
