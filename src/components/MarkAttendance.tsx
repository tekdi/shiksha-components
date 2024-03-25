import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
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

// Define a type for the icon prop
type IconType = React.ReactElement<typeof Icon>;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
}));

const ATTENDANCE_ENUM = {
    PRESENT: "present",
    ABSENT: "absent",
    HALF_DAY: "halfday",
    NOT_MARKED: "notmarked"
}

interface MarkAttendanceProps {
    isOpen: boolean,
    selfAttendance?: boolean,
    date: string,
    name?: string,
    currentStatus: string,
    handleClose: () => void,
    handleSubmit: () => void,
}

const MarkAttendance: React.FC<MarkAttendanceProps> = ({
    isOpen,
    selfAttendance = true,
    date,
    name,
    currentStatus,
    handleClose,
    handleSubmit
}) => {
    const [status, setStatus] = React.useState(currentStatus)
    const theme = useTheme<any>();
    console.log({ name });

    const getButtonComponent = (value: string, icon1: IconType, icon2: IconType, text: string) => {
        console.log(value, text)
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
        )
    }
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
                sx={{ borderRadius: '16px' }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <Typography variant="h2" sx={{ marginBottom: 0 }}>{currentStatus === ATTENDANCE_ENUM.NOT_MARKED ? "Mark Attendance" : "Update Attendance"}</Typography>
                    <Typography variant="h4" sx={{ marginBottom: 0, color: theme.palette.warning["A200"] }}>{date}</Typography>
                </DialogTitle>
                {/* <Typography variant="h2">Mark Attendance</Typography> */}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.warning["A200"],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center">
                        {!selfAttendance && <Typography variant="body1">{name}</Typography>}
                        {getButtonComponent(ATTENDANCE_ENUM.PRESENT, <CheckCircleIcon />, <CheckCircleOutlineIcon />, "Present")}
                        {getButtonComponent(ATTENDANCE_ENUM.ABSENT, <CancelIcon />, <HighlightOffIcon />, selfAttendance ? "On Leave" : "Absent")}
                        {selfAttendance && getButtonComponent(ATTENDANCE_ENUM.HALF_DAY, <RemoveCircleIcon />, <RemoveCircleOutlineIcon />, "Half Day")}
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
                        onClick={handleSubmit}
                        disabled={status === ATTENDANCE_ENUM.NOT_MARKED || status === currentStatus}
                        sx={{
                            width: '100%',
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

export default MarkAttendance;