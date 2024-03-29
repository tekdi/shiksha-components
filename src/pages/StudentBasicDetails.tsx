import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Color, Stack, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon, East as EastIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import StudentStatsCard from '../components/StudentStatsCard';
import Header from '../components/Header';
import CustomSelect from '../components/CustomSelect';
import { getUser } from '../services/profileService';
import { decodeToken } from '../utils/Helper';
import { useTranslation } from 'react-i18next';
import { UserData } from '../utils/Interfaces';

const StudentDetails = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [studentData, setStudentData] = useState([
    {
      dob_title: 'Date of Birth',
      latest_education: 'Latest Education',
      Location: 'Location',
      Enrollment_Date: 'Enrollment Date',
      School: 'School',
      Dropout_year: 'Dropout year',
      MaritalStatus: 'Marital Status',
      EmploymentStatus: 'Employment Status'
    }
  ]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = decodeToken(token);
          const xHasuraUserId = payload['https://hasura.io/jwt/claims']['x-hasura-user-id'];
          const response = await getUser(xHasuraUserId);
          const userDataFromJson = response?.result?.userData;
          setUserData(userDataFromJson);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };
    fetchUserDetails();
  }, []);

  const renderStatsCard = (label1: string, value1: string) => (
    <StudentStatsCard label1={label1} value1={value1} label2={false} value2="5" />
  );

  return (
    <>
      <Header />
      <Box mt={3} display="flex" gap={2} alignItems="flex-start">
        <Link to="/">
          <ArrowBackIcon
            sx={{ color: (theme.palette.warning as unknown as Color)['A200'], fontSize: 'large' }}
          />
        </Link>
        <Stack>
          <Typography
            variant="h3"
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontSize: '22px'
            }}
          >
            Class A
          </Typography>
        </Stack>
      </Box>
      <Box padding={2}>
        <Card
          sx={{
            bgcolor: theme.palette.secondary.light,
            borderRadius: theme.spacing(3),
            boxShadow: 'none'
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                sx={{
                  color: (theme.palette.warning as unknown as Color)['A200'],
                  fontFamily: theme.typography.fontFamily,
                  fontWeight: 500,
                  fontSize: '15px'
                }}
                variant="h6"
                gutterBottom
              >
                {t('COMMON.ATTENDANCE_REPORT')}
              </Typography>
              <Link to="/history">
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                  <Typography
                    sx={{
                      color: theme.palette.secondary.main,
                      marginRight: '4px',
                      fontSize: '14px'
                    }}
                    variant="h6"
                    gutterBottom
                  >
                    History
                  </Typography>
                  <EastIcon
                    fontSize="inherit"
                    sx={{ color: theme.palette.secondary.main, marginBottom: '5px' }}
                  />
                </Box>
              </Link>
            </Box>
            <Typography
              sx={{ color: theme.palette.text.secondary, fontSize: '14px', fontWeight: 500 }}
              variant="h6"
              gutterBottom
            >
              As of 24 May
            </Typography>
            <Box
              gap={1}
              sx={{
                bgcolor: 'transparent',
                justifyContent: 'center',
                display: 'flex',
                marginTop: 2
              }}
            >
              {renderStatsCard('Attendance', '78%')}
              {renderStatsCard('Classes Missed', '2')}
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
          }}
        >
          <CardContent>
            <Typography
              sx={{
                color: (theme.palette.warning as unknown as Color)['A200'],
                fontWeight: 500,
                fontSize: '15px'
              }}
              variant="h6"
              gutterBottom
            >
              {t('COMMON.TEST_REPORT')}
            </Typography>
            <CustomSelect />
            <Box
              sx={{ bgcolor: 'transparent', justifyContent: 'center' }}
              display="flex"
              gap={1}
              alignItems="center"
            >
              {renderStatsCard('Status', 'Passed')}
              {renderStatsCard('Score', '82%')}
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Card
        sx={{
          bgcolor: (theme.palette.warning as unknown as Color)[800],
          maxHeight: '600px',
          boxShadow: 'none',
          marginTop: '10px',
          overflow: 'auto'
        }}
      >
        <CardContent>
          <Typography
            sx={{
              color: (theme.palette.warning as unknown as Color)['A200'],
              fontSize: '15px',
              fontWeight: 500
            }}
            variant="h6"
            gutterBottom
          >
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
          }}
        >
          {studentData.map((item: any) => (
            <Box key={item.id} sx={{ padding: '16px' }}>
              <Typography
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                {item.dob_title}
              </Typography>
              <Typography sx={{ fontWeight: 500 }}>{userData?.dob}</Typography>
            </Box>
          ))}
        </Card>
      </Card>
    </>
  );
};

export default StudentDetails;
