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
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; //present
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel'; //absent
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'; //Half-Day
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

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
    title: string,
    date: string,
    name?: string,
    currentStatus: string,
    handleClose: () => void,
    handleSubmit: () => void,
}

const MarkAttendance: React.FC<MarkAttendanceProps> = ({
    isOpen,
    title,
    date,
    name,
    currentStatus,
    handleClose,
    handleSubmit
}) => {
    const [status, setStatus] = React.useState(currentStatus)
    const theme = useTheme<any>();
    console.log({ name });
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <Typography variant="h2" sx={{ marginBottom: 0 }}>{title}</Typography>
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
                    <Box display="flex" flexDirection="row" justifyContent="space-around">
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            p={2}
                            onClick={() => setStatus(ATTENDANCE_ENUM.PRESENT)}
                        >
                            {status === ATTENDANCE_ENUM.PRESENT ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
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
                            onClick={() => setStatus(ATTENDANCE_ENUM.HALF_DAY)}
                        >
                            {status === ATTENDANCE_ENUM.HALF_DAY ? <RemoveCircleIcon /> : <RemoveCircleOutlineIcon />}
                            <Typography marginTop={1}>Half Day</Typography>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        autoFocus
                        onClick={handleClose}
                        sx={{
                            width: '100%',
                            display: currentStatus === ATTENDANCE_ENUM.NOT_MARKED ? 'none' : 'block'
                        }}
                    >
                        Clear
                    </Button>
                    <Button
                        variant="contained"
                        autoFocus
                        onClick={handleSubmit}
                        disabled={status === ATTENDANCE_ENUM.NOT_MARKED}
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