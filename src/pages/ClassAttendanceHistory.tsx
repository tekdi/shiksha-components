import React, { useEffect, useState } from 'react';
import CalendarWithAttendance from '../components/CalenderWithAttendance';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography
} from '@mui/material';
import Header from '../components/Header';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getAttendanceByDate } from '../services/AttendanceService';
import { AttendanceByDateParams } from '../utils/Interfaces';
import AttendanceStatus from '../components/AttendanceStatus';
import MarkAttendance from '../components/MarkAttendance';
import { useTranslation } from 'react-i18next';
import SortingModal from '../components/SortingModal';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { debounce, getTodayDate } from '../utils/Helper';
import AttendanceStatusListView from '../components/AttendanceStatusListView';
import { getMyClassDetails, getMyCohortMemberList } from '../services/MyClassDetailsService';
import { useNavigate, useParams } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';

interface user {
  key: string;
}

interface cohort {
  cohortId: string;
  name: string;
  value: string;
}

const ClassAttendanceHistory = () => {
  const theme = useTheme<any>();
  const { t } = useTranslation();
  const { cohortId } = useParams<{ cohortId: string }>();
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [presentDates, setPresentDates] = useState<string[]>([]);
  const [absentDates, setAbsentDates] = useState<string[]>([]);
  const [halfDayDates, setHalfDayDates] = useState<string[]>([]);
  const [notMarkedDates, setNotMarkedDates] = useState<string[]>([]);
  const [futureDates, setFutureDates] = useState<string[]>([]);
  const [activeStartDate, setActiveStartDate] = useState<Date>(() => {
    const storedDate = localStorage.getItem('activeStartDate');
    return storedDate ? new Date(storedDate) : new Date();
  });
  const [status, setStatus] = useState('');
  const [center, setCenter] = useState('');
  const [classes, setClasses] = React.useState('');
  const [searchWord, setSearchWord] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [openMarkAttendance, setOpenMarkAttendance] = useState(false);
  const [bulkAttendanceStatus, setBulkAttendanceStatus] = React.useState('');
  const [cohortMemberList, setCohortMemberList] = React.useState<Array<user>>([]);
  const [numberOfCohortMembers, setNumberOfCohortMembers] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(getTodayDate);
  const handleMarkAttendanceModal = () => setOpenMarkAttendance(!openMarkAttendance);

  let userId: string = '00772d32-3f60-4a8e-a5e0-d0110c5c42fb';

  const limit = 100;
  const page = 0;
  const attendanceDate = currentDate;
  const report = false;
  const offset = 0;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = activeStartDate;
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const formattedFirstDay = formatDate(firstDayOfMonth);
        const formattedLastDay = formatDate(lastDayOfMonth);

        const attendanceData: AttendanceByDateParams = {
          fromDate: '2024-03-01',
          toDate: '2024-03-29',
          page: 0,
          filters: {
            contextId: cohortId,
            userId: '00772d32-3f60-4a8e-a5e0-d0110c5c42fb'
          }
        };

        const response = await getAttendanceByDate(attendanceData);
        setAttendanceData(response?.data || []);

        const presentDatesArray: string[] = [];
        const absentDatesArray: string[] = [];
        const halfDayDatesArray: string[] = [];

        response?.data.forEach((item: any) => {
          switch (item.attendance) {
            case 'present':
              presentDatesArray.push(item.attendanceDate);
              break;
            case 'on-leave':
              absentDatesArray.push(item.attendanceDate);
              break;
            case 'half-day':
              halfDayDatesArray.push(item.attendanceDate);
              break;
            default:
              break;
          }
        });

        const allDatesInRange: string[] = getAllDatesInRange(formattedFirstDay, formattedLastDay);
        const markedDates: Set<string> = new Set([
          ...presentDatesArray,
          ...absentDatesArray,
          ...halfDayDatesArray
        ]);
        const notMarkedDates: string[] = allDatesInRange.filter((date) => {
          return !markedDates.has(date) && !isWeekend(date) && !isFutureDate(date);
        });

        const futureDates: string[] = allDatesInRange.filter((date) => isFutureDate(date));

        setPresentDates(presentDatesArray);
        setAbsentDates(absentDatesArray);
        setHalfDayDates(halfDayDatesArray);
        setNotMarkedDates(notMarkedDates);
        setFutureDates(futureDates);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [activeStartDate]);

  useEffect(() => {
    localStorage.setItem('activeStartDate', activeStartDate.toISOString());
  }, [activeStartDate]);

  useEffect(() => {
    handleSelectedDateChange(selectedDate);
  }, []);

  const handleActiveStartDateChange = (date: Date) => {
    setActiveStartDate(date);
    console.log('date change called', date);
  };

  // updated function : it will handle null or undefiend data
  const formatDate = (date: Date | null | undefined) => {
    if (!date) {
      return '';
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getAllDatesInRange = (startDate: string, endDate: string): string[] => {
    const datesArray: string[] = [];
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      datesArray.push(formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesArray;
  };

  const isWeekend = (date: string): boolean => {
    const dayOfWeek = new Date(date).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0 is Sunday, 6 is Saturday
  };

  const isFutureDate = (date: string): boolean => {
    return new Date(date) > new Date(); // Check if the date is after the current date
  };

  const handleSelectedDateChange = (date: Date) => {
    setSelectedDate(date);
    const formattedSelectedDate = formatDate(date);
    let status = '';
    if (presentDates.includes(formattedSelectedDate)) {
      status = 'Present';
    } else if (absentDates.includes(formattedSelectedDate)) {
      status = 'Absent';
    } else if (halfDayDates.includes(formattedSelectedDate)) {
      status = 'Half-day';
    } else if (notMarkedDates.includes(formattedSelectedDate)) {
      status = 'Not marked';
    } else if (futureDates.includes(formattedSelectedDate)) {
      status = 'Future date';
    }
    console.log(`Status of ${formattedSelectedDate}: ${status}`);
    setStatus(status);
  };

  //   const handleChange = (event: SelectChangeEvent) => {
  //     setCenter(event.target.value as string);
  //   };

  const formatToShowDateMonth = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const handleUpdate = () => {};

  const handleSearchClear = () => {
    setSearchWord('');
    let filter = {
      search: ''
    };
    getCohortMemberList(filter);
  };
  // handle search student data
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
    if (event.target.value.length >= 3) {
      debouncedSearch(event.target.value);
    } else {
      let filter = {
        search: ''
      };
      getCohortMemberList(filter);
      // getCohortDetails(limit, page, filter);
    }
  };

  // debounce use for searching time period is 2 sec
  const debouncedSearch = debounce((value: string) => {
    let filter = {
      search: value ? value : searchWord
    };
    getCohortMemberList(filter);
    // getCohortDetails(limit, page, filter);
  }, 200);

  const handleSearchSubmit = () => {
    let filter = {
      search: searchWord ? searchWord : ''
    };
    getCohortMemberList(filter);
    // getCohortDetails(limit, page, filter);
  };

  // open modal of sort
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // close modal of sort
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // handle sorting data
  const handleSorting = (sortByName: string, sortByAttendance: string) => {
    // handleCloseModal();
    // let filter = {
    //   nameOrder: sortByName,
    //   percentageOrder: sortByAttendance
    // };
    // getCohortDetails(limit, page, filter);
  };

  const submitBulkAttendanceAction = (
    isBulkAction: boolean,
    status: string,
    id?: string | undefined
  ) => {
    const updatedAttendanceList = cohortMemberList?.map((user: any) => {
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
    console.log('updatedAttendanceList', updatedAttendanceList);
    setCohortMemberList(updatedAttendanceList);
  };

  const handleBackEvent = () => {
    navigate(-1);
  };

  //get cohortMembersList
  const getCohortMemberList = async (filters: object) => {
    setLoading(true);
    try {
      const contextId = cohortId;
      const response = await getMyCohortMemberList({
        contextId,
        attendanceDate,
        report,
        limit,
        offset,
        filters
      });
      if (response?.statusCode === 200) {
        const resp = response?.data;
        if (resp?.length > 0) {
          setCohortMemberList(resp);
          setNumberOfCohortMembers(resp?.length);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error fetching cohort list:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    let filter = {};
    getCohortMemberList(filter);
  }, [classes]);

  const handleChange = (event: SelectChangeEvent) => {
    setClasses(event.target.value as string);
  };

  return (
    <Box minHeight="100vh" textAlign={'center'}>
      <Header />

      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'1rem'}
        padding={'1rem'}
        alignItems={'center'}>
        <Box
          display={'flex'}
          sx={{ color: theme.palette.warning['A200'] }}
          gap={'10px'}
          width={'100%'}
          justifyContent={'center'}
          position={'relative'}>
          <Box position={'absolute'} left={'0'}>
            <ArrowBackIcon
              sx={{ color: theme.palette.warning['A200'], cursor: 'pointer' }}
              onClick={handleBackEvent}
            />
          </Box>
          <Box>
            <Typography marginBottom={'0px'} fontSize={'25px'}>
              {t('ATTENDANCE.MY_ATTENDANCE_HISTORY')}
            </Typography>

            <Typography fontSize={'15px'}>Khapari Dharmu (Chimur, Chandrapur)</Typography>
          </Box>
        </Box>
      </Box>

      <CalendarWithAttendance
        presentDates={presentDates}
        absentDates={absentDates}
        halfDayDates={halfDayDates}
        notMarkedDates={notMarkedDates}
        futureDates={futureDates}
        onChange={handleActiveStartDateChange}
        onDateChange={handleSelectedDateChange}
      />

      <Box ml={1} mt={2}>
        <Box display={'flex'} gap={'10px'} width={'100%'} mb={3}>
          <Typography marginBottom={'0px'} fontSize={'16px'} fontWeight={'500'}>
            {' '}
            {t('COMMON.ATTENDANCE')} {formatToShowDateMonth(selectedDate)}
          </Typography>
        </Box>
        {/*----------------------------search and Sort---------------------------------------*/}
        <Stack mr={1} ml={1}>
          <Box
            // display={'flex'}
            mt={3}
            mb={3}
            // justifyContent={'space-between'}
            // alignItems={'center'}
            boxShadow={'none'}>
            <Grid container alignItems="center" display={'flex'} justifyContent="space-between">
              <Grid item xs={8}>
                <Paper
                  component="form"
                  sx={{
                    // p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',

                    borderRadius: '100px',
                    background: theme.palette.warning.A700,
                    boxShadow: 'none'
                  }}>
                  <InputBase
                    value={searchWord}
                    sx={{ ml: 3, flex: 1, mb: '0', fontSize: '14px' }}
                    placeholder={t('COMMON.SEARCH_STUDENT') + '..'}
                    inputProps={{ 'aria-label': 'search student' }}
                    onChange={handleSearch}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={handleSearchSubmit}>
                    <SearchIcon />
                  </IconButton>

                  {searchWord?.length > 0 && (
                    <IconButton
                      type="button"
                      // sx={{ p: '10px' }}

                      aria-label="Clear"
                      onClick={handleSearchClear}>
                      <ClearIcon />
                    </IconButton>
                  )}
                </Paper>
              </Grid>
              <Grid item xs={4} display={'flex'} justifyContent={'flex-end'}>
                <Button
                  onClick={handleOpenModal}
                  sx={{
                    color: theme.palette.warning.A200,

                    borderRadius: '10px',
                    fontSize: '14px'
                  }}
                  endIcon={<ArrowDropDownSharpIcon />}
                  size="small"
                  variant="outlined">
                  {/* {t('COMMON.SORT_BY')} */}
                  {t('COMMON.SORT_BY').length > 7
                    ? `${t('COMMON.SORT_BY').substring(0, 6)}...`
                    : t('COMMON.SORT_BY')}
                </Button>
              </Grid>
            </Grid>
          </Box>
          <SortingModal
            isModalOpen={modalOpen}
            handleCloseModal={handleCloseModal}
            handleSorting={handleSorting}
          />
        </Stack>
        <Box>
          {status && <AttendanceStatus status={status} onUpdate={handleMarkAttendanceModal} />}
        </Box>
        {cohortMemberList?.length > 0 ? (
          <Box height={'57%'} sx={{ overflowY: 'scroll' }}>
            {cohortMemberList?.map((user: any) => (
              <AttendanceStatusListView
                key={user.userId}
                userData={user}
                isEdit={false}
                bulkAttendanceStatus={bulkAttendanceStatus}
                handleBulkAction={submitBulkAttendanceAction}
              />
            ))}
          </Box>
        ) : (
          <Box
            display={'flex'}
            justifyContent={'center'}
            mt={2}
            p={'1rem'}
            borderRadius={'1rem'}
            bgcolor={'secondary.light'}>
            <Typography>{t('COMMON.NO_DATA_FOUND')}</Typography>
          </Box>
        )}
      </Box>

      <MarkAttendance
        isOpen={openMarkAttendance}
        isSelfAttendance={true}
        date={formatToShowDateMonth(selectedDate)}
        currentStatus="notmarked"
        handleClose={handleMarkAttendanceModal}
        handleSubmit={handleUpdate}
      />
    </Box>
  );
};

export default ClassAttendanceHistory;