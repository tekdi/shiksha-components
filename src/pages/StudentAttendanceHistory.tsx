import React, { useEffect, useState } from 'react';
import CalendarWithAttendance from '../components/CalenderWithAttendance';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import Header from '../components/Header';
import { useTheme } from '@mui/material/styles';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { getAttendanceByDate, markAttendance } from '../services/AttendanceService';
import { AttendanceByDateParams, AttendanceParams } from '../utils/Interfaces';
import AttendanceStatus from '../components/AttendanceStatus';
import MarkAttendance from '../components/MarkAttendance';
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader.tsx';
import {  useParams } from 'react-router-dom';

const StudentAttendanceHistory = () => {
  let { cohortId } = useParams();
  const theme = useTheme<any>();
  const { t } = useTranslation();
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
  const [openMarkAttendance, setOpenMarkAttendance] = useState(false);
  const handleMarkAttendanceModal = () => setOpenMarkAttendance(!openMarkAttendance);
  const [AttendanceMessage, setAttendanceMessage] = React.useState('');
  const [loading, setLoading] = useState(false);
  let { userId } = useParams();
 // let userId: string = '00772d32-3f60-4a8e-a5e0-d0110c5c42fb';

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(cohortId && userId)
        {
        const currentDate = activeStartDate;
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const formattedFirstDay = formatDate(firstDayOfMonth);
        const formattedLastDay = formatDate(lastDayOfMonth);

        const attendanceData: AttendanceByDateParams = {
          // fromDate: formattedFirstDay,
          // toDate: formattedLastDay,
          // filters: {
          //   userId
          // }

          fromDate: '2024-03-01',
          toDate: '2024-03-29',
          page: 0,
          filters: {
            contextId: cohortId.toString(),
            userId:  userId.toString()
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
      }
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

  const handleChange = (event: SelectChangeEvent) => {
    setCenter(event.target.value as string);
  };

  const formatToShowDateMonth = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  const submitAttendance = async (date: string, status: string) => {
    //console.log(date, status);
    if (userId && cohortId) {
      const attendanceData: AttendanceParams = {
        attendanceDate: date,
        attendance: status,
        userId:userId.toString(),
        contextId:cohortId?.toString()

      };
      setLoading(true);
      try {
        const response = await markAttendance(attendanceData);
        if (response) {
          //console.log(response);
          handleMarkAttendanceModal();
          setAttendanceMessage(t('ATTENDANCE.ATTENDANCE_MARKED_SUCCESSFULLY'));
        }
        setLoading(false);
      } catch (error) {
        setAttendanceMessage(t('ATTENDANCE.ATTENDANCE_MARKED_UNSUCCESSFULLY'));
        console.error('error', error);
        setLoading(false);
      }
    }
  };

  const handleUpdate = () => {};

  return (
    <Box minHeight="100vh" textAlign={'center'}>
      <Header />

      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'1rem'}
        padding={'1rem'}
        alignItems={'center'}
      >
        <Box
          display={'flex'}
          sx={{ color: theme.palette.warning['A200'] }}
          gap={'10px'}
          width={'100%'}
          justifyContent={'center'}
          position={'relative'}
        >
          <Box position={'absolute'} left={'0'}>
            <KeyboardBackspaceOutlinedIcon sx={{ color: theme.palette.warning['A200'] }} />
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
            Attendance on {formatToShowDateMonth(selectedDate)}
          </Typography>
        </Box>
        <Box>
          {status && <AttendanceStatus status={status} onUpdate={handleMarkAttendanceModal} />}
        </Box>
      </Box>

      <MarkAttendance
        isOpen={openMarkAttendance}
        isSelfAttendance={true}
        date={selectedDate.toISOString().split('T')[0]}
        currentStatus={status}
        handleClose={handleMarkAttendanceModal}
        handleSubmit={submitAttendance}
      />
    </Box>
  );
};

export default StudentAttendanceHistory;
