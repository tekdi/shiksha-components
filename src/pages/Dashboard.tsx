import React, { useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import AttendanceStatusListView from '../components/AttendanceStatusListView';
import { useTheme } from '@mui/material/styles';
import MarkAttendance from '../components/MarkAttendance';
import { markAttendance, bulkAttendance } from '../services/AttendanceService';
import { AttendanceParams } from '../utils/Interfaces';
import { cohortList } from '../services/CohortServices';
import { getMyClassDetails } from '../services/MyClassDetailsService';
import { getTodayDate } from '../utils/Helper';
import Loader from '../components/Loader';

interface DashboardProps {
  //   buttonText: string;
}

interface DataItem {
  name: string;
  // Add other properties as needed
}

interface user {
  key: string;
}

interface cohort {
  cohortId: string;
  name: string;
  value:string
}

let userId: string = '';
let contextId: string = '';

const Dashboard: React.FC<DashboardProps> = () => {
  const [open, setOpen] = React.useState(false);
  const [selfAttendanceDetails, setSelfAttendanceDetails] = React.useState(null);
  const [cohortsData, setCohortsData] = React.useState<Array<cohort>>([])
  const [classes, setClasses] = React.useState('');
  const [cohortId, setCohortId] = React.useState(null);
  const [openMarkAttendance, setOpenMarkAttendance] = React.useState(false);
  const [cohortMemberList, setCohortMemberList] = React.useState<Array<user>>([]);
  const [numberOfCohortMembers, setNumberOfCohortMembers] = React.useState(0);
  const [currentDate, setCurrentDate] = React.useState(getTodayDate);
  const [bulkAttendanceStatus, setBulkAttendanceStatus] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const limit = 100;
  const page = 0;
  // const userAttendance = [{ userId: localStorage.getItem('userId'), attendance: 'present' }];
  const attendanceDate = currentDate;
  const contextId = classes;
  const report = false;
  const offset = 0;
  const theme = useTheme<any>();
  ``;
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

  useEffect(() => {
    const fetchCohortList = async () => {
      // const userId = localStorage.getItem('userId');
      let userId = '0f7c947f-3258-4959-80a6-d340c3639e7d';
      setLoading(true);
      try {
        if (userId) {
          const resp = await cohortList(userId);
          const extractedNames = resp?.result?.cohortData;
          const filteredData = extractedNames
            .flatMap((item:any) => {
              const addressData = item.customField.find((field:any) => field.label === 'address');
              const classTypeData = item.customField.find((field:any) => field.label === 'Class Type');
              return [
                addressData
                  ? { cohortId: item.cohortId, name: item.name, value: addressData.value }
                  : null,
                classTypeData
                  ? { cohortId: item.cohortId, name: item.name, value: classTypeData.value }
                  : null
              ];
            })
            .filter(Boolean);
          // console.log(`response cohort list`, filteredData);
          setCohortsData(filteredData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching  cohort list:', error);
        setLoading(false);
      }
    };
    fetchCohortList();
  }, []);

  useEffect(() => {
    const getCohortMemberList = async () => {
      setLoading(true);
      try {
        const response = await getMyClassDetails({
          contextId,
          attendanceDate,
          report,
          limit,
          offset
        });
        const resp = response?.data;
        setCohortMemberList(resp);
        setNumberOfCohortMembers(resp?.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cohort list:', error);
        setLoading(false);
      }
    };
    getCohortMemberList();
  }, [classes]);

  const handleModalToggle = () => setOpen(!open);
  const handleMarkAttendanceModal = () => setOpenMarkAttendance(!openMarkAttendance);

  const handleChange = (event: SelectChangeEvent) => {
    setClasses(event.target.value as string);
  };

  const submitAttendance = async (date: string, status: string) => {
    //console.log(date, status);
    const attendanceData: AttendanceParams = {
      attendanceDate: date,
      attendance: status,
      userId,
      contextId
    };
    setLoading(true);
    try {
      const response = await markAttendance(attendanceData);
      if (response) {
        //console.log(response);
        handleMarkAttendanceModal();
      }
      setLoading(false);
    } catch (error) {
      console.error('error', error);
      setLoading(false);
    }
  };

  const submitBulkAttendanceAction = (isBulkAction: boolean, status: string, id?: string | undefined) => {
    const updatedAttendanceList = cohortMemberList?.map((user:any) => {
      if (isBulkAction) {
        user.attendance = status;
        setBulkAttendanceStatus(status);
      } else {
        setBulkAttendanceStatus('');
        if (user.userId === id) {
          user.attendance = status;
        }
      }
      return user;
    });
    setCohortMemberList(updatedAttendanceList);
  };
  const viewAttendanceHistory = () => {
    navigate('/user-attendance-history');
  };

  const handleSave = () => {
    const userAttendance = cohortMemberList?.map((user:any) => {
      return {
        userId: user.userId,
        attendance: user.attendance
      };
    });
    if (userAttendance) {
      const data = {
        attendanceDate: currentDate,
        contextId,
        userAttendance
      };
      const markBulkAttendance = async () => {
        setLoading(true);
        try {
          const response = await bulkAttendance(data);
          //console.log(`response bulkAttendance`, response);
          const resp = response?.data;
          //console.log(`resp`, resp);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching  cohort list:', error);
          setLoading(false);
        }
      };
      markBulkAttendance();
    }
  };

  return (
    <Box minHeight="100vh" textAlign={'center'}>
      <Header />
      {loading && <Loader showBackdrop={true} loadingText={t('LOADING')} />}
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
          <Typography sx={{ color: theme.palette.warning['A400'] }}>{currentDate}</Typography>
          <Stack direction="row" spacing={1} marginTop={1} justifyContent={'space-between'}>
            <Button
              variant="text"
              sx={{ color: theme.palette.primary.main, padding: theme.spacing(1) }}
              onClick={viewAttendanceHistory}
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
              height={'80%'}
            >
              <Box height={'100%'} width={'100%'}>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Box marginBottom={'0px'}>
                    <Typography
                      variant="h2"
                      component="h2"
                      marginBottom={'0px'}
                      fontWeight={'bold'}
                    >
                      {t('COMMON.MARK_STUDENT_ATTENDANCE')}
                    </Typography>
                    <Typography variant="h2" component="h2">
                      {currentDate}
                    </Typography>
                  </Box>
                  <Box onClick={() => handleModalToggle()}>
                    <CloseIcon />
                  </Box>
                </Box>
                <Divider sx={{ borderBottomWidth: '0.15rem' }} />
                {loading && <Loader showBackdrop={true} loadingText={t('LOADING')} />}
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel>{t('DASHBOARD.CLASS')}</InputLabel>
                      <Select value={classes} label="Class" onChange={handleChange}>
                        {cohortsData?.map((cohort) => (
                          <MenuItem
                            key={cohort.cohortId}
                            value={cohort.cohortId}
                          >
                            {cohort.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Typography>
                  {t('ATTENDANCE.TOTAL_STUDENTS', { count: numberOfCohortMembers })}
                </Typography>
                <Box height={'57%'} sx={{ overflowY: 'scroll' }}>
                  
                  <AttendanceStatusListView
                    isEdit={true}
                    isBulkAction={true}
                    bulkAttendanceStatus={bulkAttendanceStatus}
                    handleBulkAction={submitBulkAttendanceAction}
                  />
                  {cohortMemberList?.map((user:any) => (
                    <AttendanceStatusListView
                      key={user.userId}
                      userData={user}
                      isEdit={true}
                      bulkAttendanceStatus={bulkAttendanceStatus}
                      handleBulkAction={submitBulkAttendanceAction}
                    />
                  ))}
                </Box>

                <Box
                  position={'absolute'}
                  bottom="30px"
                  display={'flex'}
                  gap={'20px'}
                  flexDirection={'row'}
                  justifyContent={'space-evenly'}
                  marginBottom={0}
                >
                  <Button
                    variant="outlined"
                    style={{ width: '8rem' }}
                    onClick={() => submitBulkAttendanceAction(true, '', '')}
                  >
                    {' '}
                    {t('COMMON.CLEAR_ALL')}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: '8rem' }}
                    onClick={handleSave}
                  >
                    {t('COMMON.SAVE')}
                  </Button>
                </Box>
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
            <Button variant="text" sx={{ color: theme.palette.secondary.main }} disabled>
              {t('DASHBOARD.ADD_NEW_CLASS')} <AddIcon />
            </Button>
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
          {cohortsData &&
            cohortsData.map((cohort) => (
              <Box key={cohort.cohortId}>
                <Typography>{cohort.value}</Typography>
                <CohortCard
                  showBackground={true}
                  isRemote={cohort.value === 'remote'}
                  cohortName={cohort.name}
                />
              </Box>
            ))}
        </Box>
      </Box>
      <MarkAttendance
        isOpen={openMarkAttendance}
        isSelfAttendance={true}
        date={currentDate}
        currentStatus="notmarked"
        handleClose={handleMarkAttendanceModal}
        handleSubmit={submitAttendance}
      />
    </Box>
  );
};

export default Dashboard;
