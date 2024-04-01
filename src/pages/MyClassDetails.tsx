import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from '../components/Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Stack } from '@mui/system';
import ButtonFunctional from '../components/buttonComponent';
import StudentsStatsList from '../components/StudentsStatsList';
import StudentStatsCard from '../components/StudentStatsCard';
import EastIcon from '@mui/icons-material/East';
import { Link } from 'react-router-dom';
import { getMyClassDetails } from '../services/MyClassDetailsService';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';

// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import SortingModal from '../components/SortingModal';
import { Student } from '../utils/Interfaces';
import { debounce } from '../utils/Helper';
export default function MyClassDetails() {
  // dependancies
  const { t } = useTranslation();
  const theme = useTheme<any>();

  // state declaration
  const [classData, setClassData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(100);
  const [searchWord, setSearchWord] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [averagePercentage, setAveragePercentage] = React.useState(0);
  

  // functions

  React.useEffect(() => {
    let filter = {
      search: searchWord ? searchWord : ''
    };
    getCohortDetails(limit, page, filter);
  }, []);

  const handleSecondClickButton = () => {
    console.log(' Mark Today’s Attendance');
  };

  // get all student list of cohort  or class details
  const getCohortDetails = async (limitvalue: number, value: number, filter: object) => {
    try {
      const contextId = 'e371526c-28f9-4646-b19a-a54d5f191ad2';
      const report = true;
      const pageLimit = limitvalue ? limitvalue : limit;
      const response = await getMyClassDetails({
        contextId,
        report,
        limit: pageLimit,
        offset: value,
        filters: filter
      });
      const result = response;
      if (result?.statusCode === 200) {
        const dataReport = result?.data?.report;
        setClassData(dataReport);

        const average = result?.data?.average;
        const attendance_percentage = Math.round(average?.average_attendance_percentage);

        setAveragePercentage(attendance_percentage);
      }
    } catch (error) {
      console.error('Error fetching  cohort list:', error);
    }
  };

  // open modal of sort
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // close modal of sort
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // handle search student data
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
    debouncedSearch(event.target.value);
  };

  // debounce use for searching time period is 2 sec
  const debouncedSearch = debounce((value: string) => {
    let filter = {
      search: value ? value : searchWord
    };
    getCohortDetails(limit, page, filter);
  }, 200);

  const handleSearchSubmit = () => {
    let filter = {
      search: searchWord ? searchWord : ''
    };
    getCohortDetails(limit, page, filter);
  };

  // handle sorting data
  const handleSorting = (sortByName: string, sortByAttendance: string) => {
    handleCloseModal();
    let filter = {
      nameOrder: sortByName,
      percentageOrder: sortByAttendance
    };

    getCohortDetails(limit, page, filter);
  };

  return (
    <>
      <Stack mr={4} ml={4}>
        <Box>
          <Header />
          <Box mt={3} display={'flex'} gap={2} alignItems={'flex-start'}>
            <Link to={'/Dashboard'} color={theme.palette.warning.A200}>
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
                  {t('COMMON.ATTENDANCE_REPORT')}
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
                <Link to={'/class-attendance-history'} style={{ display: 'flex' }}>
                  <Typography
                    sx={{ color: theme.palette.secondary.main, fontSize: '16px' }}
                    mr={1}
                    variant="h6"
                    gutterBottom
                  >
                    {t('DASHBOARD.HISTORY')}
                  </Typography>
                  <EastIcon fontSize="small" sx={{ color: theme.palette.secondary.main }} />
                </Link>
              </Box>
            </Box>

            {/* <Box
              sx={{
                bgcolor: 'trasparent',
                justifyContent: 'space-evenly'
              }}
              display="flex"
              alignItems="center"
              gap={1}> */}
            <Grid container display={'flex'} justifyContent={'space-between'}>
              <Grid item xs={5}>
                <StudentStatsCard
                  label1="Attendance"
                  value1={averagePercentage + '%'} // Sample attendance data, replace with actual data
                  label2={false}
                  value2="5" // Sample late arrivals data, replace with actual data
                />
              </Grid>
              <Grid item xs={5}>
                <StudentStatsCard
                  label1="Classes Missed"
                  value1="2" // Sample attendance data, replace with actual data
                  label2={false}
                  value2="5" // Sample late arrivals data, replace with actual data
                />
              </Grid>
            </Grid>
            {/* </Box> */}
          </CardContent>
        </Card>
        {/*----------------------------search and Sort---------------------------------------*/}
        <Box
          // display={'flex'}
          mt={3}
          mb={3}
          // justifyContent={'space-between'}
          // alignItems={'center'}
          boxShadow={'none'}
        >
          <Grid container alignItems="center" display={'flex'} justifyContent="space-between">
            <Grid item xs={8}>
              <Paper
                component="form"
                sx={{
                  // p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 'auto',
                  borderRadius: '100px',
                  background: theme.palette.warning.A700,
                  boxShadow: 'none'
                }}
              >
                <InputBase
                  sx={{ ml: 3, flex: 1, mb: '0', fontSize: '14px' }}
                  placeholder={t('COMMON.SEARCH_STUDENT') + '..'}
                  inputProps={{ 'aria-label': 'search student' }}
                  onChange={handleSearch}
                />
                <IconButton
                  type="button"
                  sx={{ p: '10px' }}
                  aria-label="search"
                  onClick={handleSearchSubmit}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item xs={4} display={'flex'} justifyContent={'flex-end'}>
              <Button
                onClick={handleOpenModal}
                sx={{
                  color: theme.palette.warning.A200,
                  height: 'auto',
                  width: 'auto',
                  borderRadius: '10px',
                  fontSize: '14px'
                }}
                endIcon={<ArrowDropDownSharpIcon />}
                size="small"
                variant="outlined"
              >
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
      {/*------------------student list */}
      <Stack>
        {classData?.map((student: Student, i: number) => {
          const word = student.name;
          const firstLetter = word.charAt(0);
          const firstLetterCap = firstLetter.toUpperCase();
          const remainingLetters = word.slice(1);
          const capitalizedWord = firstLetterCap + remainingLetters;
          return (
            <div key={i}>
              <StudentsStatsList
                name={capitalizedWord}
                value1={student.attendance_percentage}
                label1={student.label1}
                value2={i}
                label2={student.label2}
              />
            </div>
          );
        })}
      </Stack>
    </>
  );
}
