import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; //present
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel'; //absent
import CloseIcon from '@mui/icons-material/Close';

const PREFIX = "AttendanceStatusListView";

const classes = {
    root: `${PREFIX}-root`,
    content: `${PREFIX}-content`,
    label: `${PREFIX}-label`,
};

const Root = styled('div')(({ }) => ({
    [`&.${classes.root}`]: {
        display: 'flex',
        height: 56,
        // width: 296,
        borderBottom: '1px solid #EDE1CF',
        padding: 8
    },
    [`& .${classes.content}`]: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        fontSize: 16,
        fontWeight: 400,
        color: "#1F1B13",
    },
    [`& .${classes.label}`]: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        fontSize: 11,
        fontWeight: 400,
        color: "#1F1B13",
    },
}))

interface AttendanceStatusListViewProps {
    isPresent: boolean;
    studentName: string;
}

const AttendanceStatusListView: React.FC<AttendanceStatusListViewProps> = ({ isPresent, studentName }) => {
    const [checked, setChecked] = React.useState(isPresent);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <Root className={classes.root}>
            <Typography className={classes.content}>
                {studentName}
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={2}
            >
                {isPresent ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
                <Typography className={classes.label}>Present</Typography>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={2}
            >
                {isPresent ? <CloseIcon /> : <CancelIcon />}
                <Typography className={classes.label}>Absent</Typography>
            </Box>
        </Root>
    );
};

export default AttendanceStatusListView;