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
import { Link, useParams } from 'react-router-dom';
import { getMyClassDetails } from '../services/MyClassDetailsService';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import SortingModal from '../components/SortingModal';
import { Student } from '../utils/Interfaces';
import { debounce, formatDate, getTodayDate } from '../utils/Helper';
import { cohortList } from '../services/CohortServices';
import Loader from '../components/Loader';

interface cohort {
  cohortId: string;
  name: string;
  value: string;
}

let userId = localStorage.getItem('userId');

export default function MyClassDetails() {
  // dependancies
  const { t } = useTranslation();
  const theme = useTheme<any>();
  const { cohortId } = useParams<{ cohortId: string }>();

  // state declaration
  const [classData, setClassData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(100);
  const [searchWord, setSearchWord] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [averagePercentage, setAveragePercentage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [cohortsData, setCohortsData] = React.useState<Array<cohort>>([]);
  const [classes, setClasses] = React.useState('');
  const [currentDate, setCurrentDate] = React.useState(getTodayDate);

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
      const contextId = cohortId;
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

        setLoading(true);
        if (dataReport?.length > 0) {
          setClassData(dataReport);
        } else {
          setClassData([]);
        }

        const average = result?.data?.average;
        const attendance_percentage = Math.round(average?.average_attendance_percentage);

        setAveragePercentage(attendance_percentage);
        setLoading(false);
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
    const MIN_SEARCH_LENGTH = 3;
    if (event.target.value.length >= MIN_SEARCH_LENGTH) {
      debouncedSearch(event.target.value);
    } else {
      let filter = {
        search: ''
      };
      getCohortDetails(limit, page, filter);
    }
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

  const handleSearchClear = () => {
    setSearchWord('');
    getCohortDetails(limit, page, { search: '' });
  };

  // handle sorting data
  const handleSorting = (sortByName: string, sortByAttendance: string) => {
    handleCloseModal();
    let filter1 = {
      nameOrder: sortByName
    };
    let filter2 = {
      percentageOrder: sortByAttendance
    };

    const updatedFilter = sortByName ? filter1 : filter2;

    getCohortDetails(limit, page, updatedFilter);
  };

  // function for show class details and address fetch
  React.useEffect(() => {
    const fetchCohortList = async () => {
      const userId = localStorage.getItem('userId');
      setLoading(true);
      try {
        if (userId) {
          const resp = await cohortList(userId);
          const extractedNames = resp?.data?.cohortData;
          localStorage.setItem('parentCohortId', extractedNames[0].parentId);
          //  setTeacherContextId(extractedNames[0].parentId)
          //  console.log("p",extractedNames[0].parentId)

          const filteredData = extractedNames
            .flatMap((item: any) => {
              const addressData = item.customField.find((field: any) => field.label === 'address');
              const classTypeData = item.customField.find(
                (field: any) => field.label === 'Class Type'
              );
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

          const classDetails = filteredData.filter((data: any) => cohortId === data?.cohortId);
          setCohortsData(classDetails);
          setClasses(filteredData[0].cohortId);
          // setShowUpdateButton(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching  cohort list:', error);
        setLoading(false);
      }
    };
    fetchCohortList();
  }, []);

  return (
    <>
      <Stack m={'0 8px'}>
        <Box>
          <Header />
          <Box mt={3} display={'flex'} gap={2} alignItems={'flex-start'}>
            <Link to={'/Dashboard'} color={theme.palette.warning.A200}>
              <ArrowBackIcon color={theme.palette.warning.A200} fontSize="medium" />
            </Link>
            <Stack>
              {cohortsData &&
                cohortsData.map((cohort) => (
                  <Box key={cohort?.name}>
                    <Typography
                      variant="h1"
                      m={0}
                      fontWeight={'bold'}
                      color={theme.palette.warning.A200}>
                      {cohort?.name}
                    </Typography>
                    <Typography
                      m={0}
                      fontSize={'11px'}
                      lineHeight={'16px'}
                      color={theme.palette.warning.A200}>
                      {cohort?.value}
                    </Typography>
                  </Box>
                ))}
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
          }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Box>
                <Typography
                  sx={{ fontSize: '16px', fontWeight: 600, color: theme.palette.warning.A200 }}
                  variant="h6"
                  gutterBottom>
                  {t('COMMON.ATTENDANCE_REPORT')}
                </Typography>
                <Typography
                  sx={{ fontSize: '14px', fontWeight: 600, color: theme.palette.warning['500'] }}
                  variant="h6"
                  gutterBottom>
                  {t('COMMON.ASOF')} {formatDate(currentDate)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Link to={`/class-attendance-history/${cohortId}`} style={{ display: 'flex' }}>
                  <Typography
                    sx={{ color: theme.palette.secondary.main, fontSize: '16px' }}
                    mr={1}
                    variant="h6"
                    gutterBottom>
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
              <Grid item xs={7}>
                <StudentStatsCard
                  label1="Attendance"
                  value1={averagePercentage + '%'} // Sample attendance data, replace with actual data
                  label2={false}
                  value2="5" // Sample late arrivals data, replace with actual data
                />
              </Grid>
              {/*  ------ commented as per requirement--------------
              
              <Grid item xs={5}>
                <StudentStatsCard
                  label1="Classes Missed"
                  value1="2" // Sample attendance data, replace with actual data
                  label2={false}
                  value2="5" // Sample late arrivals data, replace with actual data
                />
              </Grid> */}
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
      {/*------------------student list */}
      <>
        {loading ? (
          <Loader showBackdrop={true} loadingText={'Loading'} />
        ) : classData?.length > 0 ? (
          <Stack>
            {classData.map((student: Student, i) => {
              const word = student?.name;
              const userId = student?.userId;
              const firstLetter = word.charAt(0);
              const firstLetterCap = firstLetter.toUpperCase();
              const remainingLetters = word.slice(1);
              const capitalizedWord = firstLetterCap + remainingLetters;
              return (
                <div key={i}>
                  <StudentsStatsList
                    cohortId={cohortId}
                    userId={userId}
                    name={capitalizedWord}
                    value1={student?.attendance_percentage}
                    label1={student?.label1}
                    value2={i}
                    label2={student?.label2}
                  />
                </div>
              );
            })}
          </Stack>
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
      </>
    </>
  );
}