import { Box, Button, Typography } from '@mui/material';
import { RemoveCircleOutline, CheckCircleOutlineOutlined, CancelOutlined, CreateOutlined } from '@mui/icons-material';

interface AttendanceStatusProps {
    status: string;
    onUpdate?: () => void;
}

function AttendanceStatus({ status, onUpdate } : AttendanceStatusProps) {
    let icon, message;
    switch (status) {
        case 'Present':
            icon = <CheckCircleOutlineOutlined />;
            message = 'Present';
            break;
        case 'Absent':
            icon = <CancelOutlined />;
            message = 'Absent';
            break;
        case 'Half-day':
            icon = <RemoveCircleOutline />;
            message = 'Half-day';
            break;
        case 'Not marked':
            message = 'Attendance not marked';
            break;
        case 'Future date':
            message = 'Future date cannot be marked';
            break;
        default:
            break;
    }

    return (
        <Box display="flex" alignItems="center" width="100%">
            {icon && <div className={`${status.toLowerCase()}-marker`}>{icon}</div>}
            <Typography marginBottom={0} fontSize="16px">
                {message}
            </Typography>
            {onUpdate && (
                <Box position="absolute" right="0" paddingRight="1rem">
                    <Button variant="text" endIcon={<CreateOutlined />} onClick={onUpdate} disabled={status === 'Future date'}>
                        Update
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default AttendanceStatus