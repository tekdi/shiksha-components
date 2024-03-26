import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import {
  Box,
  Button,
  Card,
  CardContent,
  ThemeProvider,
  Typography,
  createMuiTheme
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from '../components/Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Stack } from '@mui/system';
import ButtonFunctional from '../components/buttonComponent';
import StudentsStatsList from '../components/StudentsStatsList';
import SearchSortBar from '../components/SearchSortBar';
import StudentStatsCard from '../components/StudentStatsCard';
import EastIcon from '@mui/icons-material/East';
import { Link } from 'react-router-dom';
import ModalComponent from '../components/Modal';
import { getClassDetails } from '../services/MyClassDetailsService';
export default function MyClassDetails() {
  const [classData, setClassData] = React.useState<(typeof classData)[]>([]);
  const handleSecondClickButton = () => {
    alert(' Mark Today’s Attendance');
  };
  const theme = useTheme<any>();

  React.useEffect(() => {
    getClassDetails().then((response: (typeof classData)[]) => {
      setClassData(response);
    });
  }, []);

  return (
    <>
      <Stack mr={4} ml={4}>
        <Box>
          <Header />
          <Box mt={3} display={'flex'} gap={2} alignItems={'flex-start'}>
            <Link to={'/'} color={theme.palette.warning.A200}>
              <ArrowBackIcon color={theme.palette.warning.A200} fontSize="medium" />
            </Link>
            <Stack>
              <Typography variant="h1" m={0} fontWeight={'bold'} color={theme.palette.warning.A200}>
                Class A
              </Typography>
              <Typography
                m={0}
                fontSize={'11px'}
                lineHeight={'16px'}
                color={theme.palette.warning.A200}
              >
                Gurukrupa Building, Paud Road
              </Typography>
            </Stack>
          </Box>
        </Box>

        <ButtonFunctional
          handleClickButton={handleSecondClickButton}
          buttonName="Mark Today’s Attendance"
        />
        <Card
          sx={{
            bgcolor: theme.palette.secondary.light,
            borderRadius: '24px',
            marginTop: '20px',
            boxShadow: 'none'
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box>
                <Typography
                  sx={{ fontSize: '16px', fontWeight: 600, color: theme.palette.warning.A200 }}
                  variant="h6"
                  gutterBottom
                >
                  Attendance Report
                </Typography>
                <Typography
                  sx={{ fontSize: '14px', fontWeight: 600, color: theme.palette.warning['500'] }}
                  variant="h6"
                  gutterBottom
                >
                  As of 24 May
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Link to={''} style={{ display: 'flex' }}>
                  <Typography
                    sx={{ color: theme.palette.secondary.main, fontSize: '16px' }}
                    mr={1}
                    variant="h6"
                    gutterBottom
                  >
                    History
                  </Typography>
                  <EastIcon fontSize="small" sx={{ color: theme.palette.secondary.main }} />
                </Link>
              </Box>
            </Box>

            <Box
              sx={{
                bgcolor: 'trasparent',
                justifyContent: 'center'
              }}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <StudentStatsCard
                label1="Attendance"
                value1="78%" // Sample attendance data, replace with actual data
                label2={false}
                value2="5" // Sample late arrivals data, replace with actual data
              />
              <StudentStatsCard
                label1="Classes Missed"
                value1="2" // Sample attendance data, replace with actual data
                label2={false}
                value2="5" // Sample late arrivals data, replace with actual data
              />
            </Box>
          </CardContent>
        </Card>

        <SearchSortBar />
      </Stack>
      {classData?.map((student, i) => {
        return (
          <div key={i}>
            <StudentsStatsList
              name={student.name}
              value1={student.value1}
              label1={student.label1}
              value2={i}
              label2={student.label2}
            />
          </div>
        );
      })}
    </>
  );
}
