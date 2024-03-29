import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, East as EastIcon } from '@mui/icons-material';
import { useTheme, Theme } from '@mui/material/styles';
import StudentStatsCard from '../components/StudentStatsCard';
import Header from '../components/Header';
import CustomSelect from '../components/CustomSelect';
import { getUser } from '../services/profileService';
import { useTranslation } from 'react-i18next';
import { UserData } from '../utils/Interfaces';
import Divider from '@mui/material/Divider';

const StudentDetails: React.FC = () => {
  const { t } = useTranslation();
  const theme: Theme = useTheme();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem('userId');
      try {
        if (userId) {
          const response = await getUser(userId);
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
  }, []);

  const componentData = [
    { title: t('Overall'), linkText: '79%' },
    {
      title: t('Mathematics'),
      linkText: '79%'
    },
    {
      title: t('English'),
      linkText: '81%'
    },
    {
      title: t('Home Science'),
      linkText: '74%'
    },
    {
      title: t('Hindi'),
      linkText: '66%'
    }
  ];

  const renderStatsCard = (label1: string, value1: string) => (
    <StudentStatsCard label1={label1} value1={value1} label2={false} value2="5" />
  );

  return (
    <>
      <Header />
      <Box mt={3} display="flex" gap={2} alignItems="flex-start">
        <Link to="/">
          <ArrowBackIcon
            sx={{ color: (theme.palette.warning as any)['A200'], fontSize: 'large' }}
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
          <Link to="/history">
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
        </Box>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 320, minHeight: 20 }}>
            <Select sx={{ height: '32px' }} >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
                color: (theme.palette.warning as any)['A200'],
                fontWeight: 500,
                fontSize: '15px'
              }}
              variant="h6"
              gutterBottom
            >
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
        }}
      >
        <CardContent>
          <Typography
            sx={{
              color: (theme.palette.warning as any)['A200'],
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
          <Box sx={{ padding: '16px' }}>
            <Typography
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              {t('COMMON.DOB')}
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>{userData?.dob}</Typography>
          </Box>
        </Card>
      </Card>
    </>
  );
};

export default StudentDetails;
