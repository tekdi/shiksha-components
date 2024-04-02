import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
  Divider,
  Grid
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, East as EastIcon } from '@mui/icons-material';
import { useTheme, Theme } from '@mui/material/styles';
import StudentStatsCard from '../components/StudentStatsCard';
import CustomSelect from '../components/CustomSelect';
import { getUser } from '../services/profileService';
import { useTranslation } from 'react-i18next';
import { UserData } from '../utils/Interfaces';
import { getAttendanceReport } from '../services/AttendanceService';
import Header from '../components/Header';
import { formatDate, getTodayDate } from '../utils/Helper';

const StudentDetails: React.FC = () => {
  const { t } = useTranslation();
  const theme: Theme = useTheme();
  const { cohortId, userId } = useParams<{ cohortId: string; userId?: string }>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [attendanceReport, setAttendanceReport] = useState<any>(null);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<object>({});
  const [maritalStatus, setMaritalStatus] = useState<string>('');
  const [currentDate, setCurrentDate] = React.useState(getTodayDate);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userId) {
          const response = await getUser(userId, 'student');
          const userDataFromJson: UserData | undefined = response?.result?.userData;
          if (userDataFromJson) {
            setUserData(userDataFromJson);
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    getOverallAttendance(limit, page, filter);
  }, [limit, page, filter, userId]);

  const getOverallAttendance = async (limitvalue: number, value: number, filter: object) => {
    try {
      if (!userId) return;
      const contextId = 'e371526c-28f9-4646-b19a-a54d5f191ad2';
      const report = true;
      const pageLimit = limitvalue;
      const response = await getAttendanceReport({
        contextId,
        userId,
        report,
        limit: pageLimit,
        filters: filter
      });
      const result = response;
      if (result?.statusCode === 200) {
        const data = result?.data;
        setAttendanceReport(data);
      }
    } catch (error) {
      console.error('Error fetching attendance report:', error);
    }
  };

  const componentData = [
    { title: t('Overall'), linkText: attendanceReport?.overallPercentage || '' },
    {
      title: t('Mathematics'),
      linkText: '79%'
    },
    {
      title: t('English'),
      linkText: '65%'
    },
    {
      title: t('Home Science'),
      linkText: '73%'
    },
    {
      title: t('Hindi'),
      linkText: '56%'
    }
  ];
  return (
    <>
      <Header />

      <Box mt={3} display="flex" gap={2} alignItems="flex-start">
        <Link to="/">
          <ArrowBackIcon
            sx={{ color: (theme.palette.warning as any)['A200'], fontSize: '1.5rem' }}
          />
        </Link>
        <Stack>
          <Typography
            variant="h3"
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontSize: '22px'
            }}>
            Class A
          </Typography>
        </Stack>
      </Box>
      <Box padding={2}>
        <Box display={'flex'} sx={{ justifyContent: 'space-between' }}>
          {' '}
          <Typography
            sx={{
              color: (theme.palette.warning as any)['A200'],
              fontFamily: theme.typography.fontFamily,
              fontWeight: 500,
              fontSize: '15px'
            }}
            variant="h6"
            gutterBottom>
            {t('COMMON.ATTENDANCE_REPORT')}
          </Typography>
          {userId && (
            <Link
              to={`/student-attendance-history/${userId}/${cohortId}`}
              style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  sx={{
                    color: theme.palette.secondary.main,
                    marginRight: '4px',
                    fontSize: '14px'
                  }}
                  variant="h6"
                  gutterBottom>
                  {t('DASHBOARD.HISTORY')}
                </Typography>
                <EastIcon
                  fontSize="inherit"
                  sx={{ color: theme.palette.secondary.main, marginBottom: '5px' }}
                />
              </Box>
            </Link>
          )}
        </Box>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 320, minHeight: 20 }}>
            <Select sx={{ height: '32px' }}>
              <MenuItem value={10}>{t('NONE')}</MenuItem>
              <MenuItem value={10}>{t('AS_OF_TODAY')}</MenuItem>
              <MenuItem value={10}>{t('AS_OF_LAST_WEEK')}</MenuItem>
              <MenuItem value={10}>{t('AS_OF_LAST_SIX_MONTH')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Card
          sx={{
            bgcolor: theme.palette.secondary.light,
            borderRadius: theme.spacing(3),
            boxShadow: 'none'
          }}>
          <CardContent>
            <Typography> {t('COMMON.OVERALL_ATTENDANCE')}</Typography>
            <Typography
              sx={{ color: theme.palette.text.secondary, fontSize: '14px', fontWeight: 500 }}
              variant="h6"
              gutterBottom>
              {'As of today' + ' ' + formatDate(currentDate)}
            </Typography>
            <Box
              gap={1}
              sx={{
                bgcolor: 'transparent',
                justifyContent: 'center',
                display: 'flex',
                marginTop: 2
              }}>
              <Grid container display={'flex'} justifyContent={'space-between'}>
                <Grid item xs={7}>
                  <StudentStatsCard
                    label1="Attendance %"
                    value1={`${Math.round(attendanceReport?.average?.average_attendance_percentage || 0)}%`}
                    label2={false}
                    value2="5"
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box padding={2}>
        <Card
          sx={{
            bgcolor: theme.palette.secondary.light,
            borderRadius: theme.spacing(3),
            boxShadow: 'none'
          }}>
          <CardContent>
            <Typography
              sx={{
                color: (theme.palette.warning as any)['A200'],
                fontWeight: 500,
                fontSize: '15px'
              }}
              variant="h6"
              gutterBottom>
              {t('COMMON.TEST_REPORT')}
            </Typography>
            <CustomSelect />
            <Box>
              {componentData.map((data, index) => (
                <React.Fragment key={index}>
                  <Box display="flex" justifyContent="space-between" sx={{ marginBottom: '15px' }}>
                    <Typography
                      sx={{
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: 500,
                        fontSize: '15px'
                      }}
                      variant="h6"
                      gutterBottom>
                      {data.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        sx={{
                          marginRight: '4px',
                          fontSize: '14px'
                        }}
                        variant="h6"
                        gutterBottom>
                        {data.linkText}
                      </Typography>
                    </Box>
                  </Box>
                  {index === 0 && <Divider sx={{ marginBottom: '20px' }} />}
                </React.Fragment>
              ))}{' '}
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Card
        sx={{
          bgcolor: (theme.palette.warning as any)[800],
          maxHeight: '600px',
          boxShadow: 'none',
          marginTop: '10px',
          overflow: 'auto'
        }}>
        <CardContent>
          <Typography
            sx={{
              color: (theme.palette.warning as any)['A200'],
              fontSize: '15px',
              fontWeight: 500
            }}
            variant="h6"
            gutterBottom>
            {t('COMMON.BASIC_DETAILS')}
          </Typography>
        </CardContent>
        <Card
          sx={{
            marginTop: theme.spacing(4),
            height: '688px',
            width: '340px',
            margin: 'auto',
            borderRadius: theme.spacing(2),
            boxShadow: 'none'
          }}>
          <Box>
            {userData?.customFields.map(
              (field, index) =>
                field.label &&
                field.value && (
                  <React.Fragment key={index}>
                    <Typography
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: '14px',
                        fontWeight: 600,
                        marginLeft: '20px',
                        marginTop: '20px'
                      }}>
                      {field.label}
                    </Typography>
                    <Typography sx={{ fontWeight: 500, marginLeft: '20px' }}>
                      {field.value}
                    </Typography>
                  </React.Fragment>
                )
            )}{' '}
          </Box>
        </Card>
      </Card>
    </>
  );
};

export default StudentDetails;
