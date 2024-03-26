import React from 'react';
import Header from '../components/Header';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import CohortCard from '../components/CohortCard';
import TodayIcon from '@mui/icons-material/Today';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import AttendanceStatusListView from '../components/AttendanceStatusListView';
import { useTheme } from '@mui/material/styles';
import MarkAttendance from '../components/MarkAttendance';
import { decodeToken } from '../utils/Helper';
import { markAttendance } from '../services/AttendanceService';
import { AttendanceParams } from '../utils/Interfaces';

interface DashboardProps {
  //   buttonText: string;
}

let userId: string = '';
let contextId: string = '';

const Dashboard: React.FC<DashboardProps> = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [selfAttendanceDetails, setSelfAttendanceDetails] = React.useState(null);
  const [openMarkAttendance, setOpenMarkAttendance] = React.useState(false);
  const handleModalToggle = () => setOpen(!open);
  const handleMarkAttendanceModal = () => setOpenMarkAttendance(!openMarkAttendance);
  const [classes, setClasses] = React.useState('');
  const theme = useTheme<any>();

  React.useEffect(() => {}, []);

  const handleChange = (event: SelectChangeEvent) => {
    setClasses(event.target.value as string);
  };
  const modalContainer = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: theme.palette.warning['A400'],
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };
  const submitAttendance = async (date: string, status: string) => {
    console.log(date, status);
    const attendanceData: AttendanceParams = {
      attendanceDate: date,
      attendance: status,
      userId,
      contextId
    };
    try {
      const response = await markAttendance(attendanceData);
      if (response) {
        console.log(response);
        handleMarkAttendanceModal();
      }
    } catch (error) {
      console.error('error', error);
    }
  };
  return (
    <Box minHeight="100vh" textAlign={'center'}>
      <Header />
      <Box display={'flex'} flexDirection={'column'} gap={'1rem'} padding={'1rem'}>
        <Box display={'flex'} sx={{ color: theme.palette.warning['A200'] }}>
          <TodayIcon />
          <Typography marginBottom={'0px'}>Ongoing: Foundation Course (May to Sep)</Typography>
        </Box>
        <Box
          border={'1px solid black'}
          height={'auto'}
          width={'auto'}
          padding={'1rem'}
          borderRadius={'1rem'}
          bgcolor={'black'}
          textAlign={'left'}
        >
          <Typography
            marginBottom={'0px'}
            sx={{ color: theme.palette.warning['A400'] }}
            style={{ fontWeight: '800', fontSize: '1.2rem' }}
          >
            {t('COMMON.MARK_MY_ATTENDANCE')}
          </Typography>
          <Typography sx={{ color: theme.palette.warning['A400'] }}>25 May 2024</Typography>
          <Stack direction="row" spacing={1} marginTop={1} justifyContent={'space-between'}>
            <Button
              variant="text"
              sx={{ color: theme.palette.primary.main, padding: theme.spacing(1) }}
            >
              {t('DASHBOARD.HISTORY')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ width: '12.5rem', padding: theme.spacing(1) }}
              onClick={handleMarkAttendanceModal}
            >
              {t('COMMON.MARK_MY_ATTENDANCE')}
            </Button>
          </Stack>
        </Box>

        <Button
          variant="outlined"
          fullWidth
          onClick={handleModalToggle}
          style={{ padding: theme.spacing(1) }}
        >
          {t('COMMON.MARK_STUDENT_ATTENDANCE')}
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleModalToggle}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500
            }
          }}
        >
          <Fade in={open}>
            <Box
              sx={{ ...modalContainer, borderColor: theme.palette.warning['A400'] }}
              borderRadius={'1rem'}
            >
              <Box display={'flex'} justifyContent={'space-between'}>
                <Box marginBottom={'0px'}>
                  <Typography variant="h2" component="h2" marginBottom={'0px'} fontWeight={'bold'}>
                    {t('COMMON.MARK_STUDENT_ATTENDANCE')}
                  </Typography>
                  <Typography variant="h2" component="h2">
                    25 May 2024
                  </Typography>
                </Box>
                <Box onClick={() => handleModalToggle()}>
                  <CloseIcon />
                </Box>
              </Box>
              <Divider sx={{ borderBottomWidth: '0.15rem' }} />
              <Box sx={{ mt: 2 }}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel>Class</InputLabel>
                    <Select value={classes} label="Class" onChange={handleChange}>
                      <MenuItem value={10}>Class A</MenuItem>
                      <MenuItem value={20}>Class B</MenuItem>
                      <MenuItem value={30}>Class C</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Typography>{t('ATTENDANCE.TOTAL_STUDENTS')}</Typography>
              <AttendanceStatusListView studentName={'Mark All'} currentStatus="notmarked" />
              <AttendanceStatusListView studentName={'Ajay'} currentStatus="notmarked" />
              <AttendanceStatusListView studentName={'Vijay'} currentStatus="notmarked" />
              <AttendanceStatusListView studentName={'Deepak'} currentStatus="notmarked" />
              <AttendanceStatusListView studentName={'Vinod'} currentStatus="notmarked" />
              <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-evenly'}
                m={'1rem'}
              >
                <Button variant="outlined" style={{ width: '8rem' }}>
                  {' '}
                  {t('COMMON.CLEAR_ALL')}
                </Button>
                <Button variant="contained" color="primary" style={{ width: '8rem' }}>
                  {t('COMMON.SAVE')}
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
      <Divider sx={{ borderBottomWidth: '0.1rem' }} />
      <Box display={'flex'} flexDirection={'column'} gap={'1rem'} padding={'1rem'}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          padding={'2px'}
        >
          <Box>
            <Button variant="text" sx={{ color: theme.palette.warning['300'] }}>
              {t('DASHBOARD.MY_CLASSES')}
            </Button>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{ color: theme.palette.secondary.main }}
          >
            <Button variant="text" sx={{ color: theme.palette.secondary.main }}>
              {t('DASHBOARD.ADD_NEW_CLASS')}
            </Button>
            <AddIcon />
          </Box>
        </Stack>
        <Box
          display={'flex'}
          flexDirection={'column'}
          textAlign={'left'}
          height={'auto'}
          width={'auto'}
          sx={{ bgcolor: theme.palette.secondary.light }}
          p={'1rem'}
          borderRadius={'1rem'}
        >
          <Typography>Gurukrupa Building, Paud Road</Typography>
          <CohortCard showBackground={true} isRemote={false} cohortName={'Class A'} />
          <Typography pt={'0.5rem'}>Remote</Typography>
          <CohortCard showBackground={true} isRemote={true} cohortName={'Class B'} />
        </Box>
      </Box>
      <MarkAttendance
        isOpen={openMarkAttendance}
        isSelfAttendance={true}
        date="2024-03-02"
        currentStatus="notmarked"
        handleClose={handleMarkAttendanceModal}
        handleSubmit={submitAttendance}
      />
    </Box>
  );
};

export default Dashboard;
