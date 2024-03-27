import React, { useEffect, useState } from 'react'
import CalendarWithAttendance from '../components/CalenderWithAttendance';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';
import { useTheme } from '@mui/material/styles';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { getAttendanceByDate } from '../services/AttendanceService';
import { AttendanceByDateParams } from '../utils/Interfaces';

const UserAttendanceHistory = () => {
  const theme = useTheme<any>();
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [presentDates, setPresentDates] = useState<string[]>([]);
  const [absentDates, setAbsentDates] = useState<string[]>([]);
  const [halfDayDates, setHalfDayDates] = useState<string[]>([]);
  const [notMarkedDates, setNotMarkedDates] = useState<string[]>([]);
  const [futureDates, setFutureDates] = useState<string[]>([]);
  const [activeStartDate, setActiveStartDate] = useState<Date>(() => {
    const storedDate = localStorage.getItem('activeStartDate');
    return storedDate ? new Date(storedDate) : new Date();
  });
  
  let userId: string = '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = activeStartDate;
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const formattedFirstDay = formatDate(firstDayOfMonth);
        const formattedLastDay = formatDate(lastDayOfMonth);

        const attendanceData: AttendanceByDateParams = {
          fromDate: formattedFirstDay,
          toDate: formattedLastDay,
          filters: {
            userId
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
        const markedDates: Set<string> = new Set([...presentDatesArray, ...absentDatesArray, ...halfDayDatesArray]);
        const notMarkedDates: string[] = allDatesInRange.filter(date => {
          return !markedDates.has(date) && !isWeekend(date) && !isFutureDate(date);
        });

        const futureDates: string[] = allDatesInRange.filter(date => isFutureDate(date));

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

  const handleActiveStartDateChange = (date: Date) => {
    setActiveStartDate(date);
    console.log("date change called", date);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

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

  return (
    <Box minHeight="100vh" textAlign={'center'}>
      <Header />
      <Box display={'flex'} flexDirection={'column'} gap={'1rem'} padding={'1rem'} alignItems={'center'}>
        <Box display={'flex'} sx={{ color: theme.palette.warning['A200'] }} gap={'10px'} width={'100%'} justifyContent={'center'} position={'relative'}>
          <Box position={'absolute'} left={'0'} >
            <KeyboardBackspaceOutlinedIcon sx={{ color: theme.palette.warning['A200'] }} />
          </Box>
          <Typography marginBottom={'0px'} fontSize={'25px'} >My Attendance History</Typography>
        </Box>
      </Box>

      <CalendarWithAttendance
        presentDates={presentDates}
        absentDates={absentDates}
        halfDayDates={halfDayDates}
        notMarkedDates={notMarkedDates}
        futureDates={futureDates}
        onChange={handleActiveStartDateChange}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'1rem'} padding={'1rem'} alignItems={'center'}>
        <Box display={'flex'} gap={'10px'} width={'100%'} >
          <Typography marginBottom={'0px'} fontSize={'16px'} >Attendance on {'date'}</Typography>
        </Box>
        {/* <Box position={'absolute'} left={'0'} >
            <KeyboardBackspaceOutlinedIcon sx={{ color: theme.palette.warning['A200'] }}/>
          </Box> */}
      </Box>
    </Box >
  )
}

export default UserAttendanceHistory;
