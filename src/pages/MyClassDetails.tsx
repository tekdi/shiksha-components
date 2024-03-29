import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  ThemeProvider,
  Typography
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
import { getMyClassDetails } from '../services/MyClassDetailsService';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';

// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { debounce } from 'lodash';
export default function MyClassDetails() {
  // dependancies
  const { t } = useTranslation();
  const theme = useTheme<any>();

  // state declaration
  const [classData, setClassData] = React.useState<(typeof classData)[]>([]);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [searchWord, setSearchWord] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [nestedModalOpen, setNestedModalOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [valueName, setValueName] = React.useState('asc');
  const [valueAttendance, setValueAttendance] = React.useState('asc');
  const [valueClassMissed, setValueClassMissed] = React.useState('lowToHigh');

  // functions

  React.useEffect(() => {
    let filter = {
      search: searchWord ? searchWord : ''
    };
    getAllCohortDetails(limit, page, filter);
  }, []);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    let filter = {
      search: searchWord ? searchWord : ''
    };
    getAllCohortDetails(limit, value, filter);
  };

  const handleSecondClickButton = () => {
    console.log(' Mark Today’s Attendance');
  };

  // get all student list of cohort  or class details
  const getAllCohortDetails = async (limitvalue: number, value: number, filter: object) => {
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
        const data = result?.data;
        setClassData(data);
      }
    } catch (error) {
      console.error('Error fetching  cohort list:', error);
    }
  };

  // handle changes names from sorting
  const handleChangeNames = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueName(event.target.value);
  };

  // handle chnage attandance in sorting
  const handleChangeAttendance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAttendance(event.target.value);
  };
  const handleChangeClassMissed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueClassMissed(event.target.value);
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
    getAllCohortDetails(limit, page, filter);
  }, 200);

  const handleSearchSubmit = () => {
    let filter = {
      search: searchWord ? searchWord : ''
    };
    getAllCohortDetails(limit, page, filter);
  };

  // handle sorting data
  const handleSorting = () => {
    handleCloseModal();
    let filter = {
      nameOrder: valueName,
      percentageOrder: valueAttendance
    };

    getAllCohortDetails(limit, page, filter);
  };

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
                color={theme.palette.warning.A200}>
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
                  As of 24 May
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Link to={''} style={{ display: 'flex' }}>
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

            <Box
              sx={{
                bgcolor: 'trasparent',
                justifyContent: 'center'
              }}
              display="flex"
              alignItems="center"
              gap={1}>
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
        {/*----------------------------search and Sort---------------------------------------*/}
        <Box
          // display={'flex'}
          mt={3}
          mb={3}
          // justifyContent={'space-between'}
          // alignItems={'center'}
          boxShadow={'none'}>
          <Grid container alignItems="center" display={'flex'} justifyContent="space-between">
            <Grid item xs={6}>
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
                }}>
                <InputBase
                  sx={{ ml: 1, flex: 1, mb: '0' }}
                  placeholder={t('COMMON.SEARCH_STUDENT') + '..'}
                  inputProps={{ 'aria-label': 'search google maps' }}
                  onChange={handleSearch}
                />
                <IconButton
                  type="button"
                  sx={{ p: '10px' }}
                  aria-label="search"
                  onClick={handleSearchSubmit}>
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={handleOpenModal}
                sx={{
                  color: theme.palette.warning.A200,
                  height: 'auto',
                  width: 'auto',
                  padding: '6px, 8px, 6px, 16px'
                }}
                endIcon={<ArrowDropDownSharpIcon />}
                size="small"
                variant="outlined">
                {t('COMMON.SORT_BY')}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* ------------------modal for sorting ------------------- */}
        <ModalComponent
          open={modalOpen}
          onClose={handleCloseModal}
          heading={'Sort By'}
          handleApplySort={handleSorting}
          // SubHeading={"Sort"}
          btnText="apply">
          <Box>
            <Divider
              style={{
                backgroundColor: theme.palette.warning['400'],
                marginBottom: '10px',
                marginTop: '15px'
              }}
            />

            <Box mt={2}>
              <FormControl>
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  style={{ color: theme.palette.warning['400'] }}>
                  {t('COMMON.NAMES')}
                </FormLabel>

                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={valueName}
                  onChange={handleChangeNames}>
                  <FormControlLabel
                    value="asc"
                    control={<Radio sx={{ ml: '300px' }} />}
                    label="A to Z"
                    labelPlacement="start"
                    sx={{ fontWeight: '500', fontSize: '14px' }}
                  />
                  <FormControlLabel
                    value="desc"
                    labelPlacement="start"
                    sx={{ fontWeight: '500', fontSize: '14px' }}
                    control={<Radio sx={{ ml: '300px' }} />}
                    label="Z to A"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box mt={2}>
              {' '}
              <FormControl>
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  style={{ color: theme.palette.warning['400'] }}>
                  {t('COMMON.ATTENDANCE')}
                </FormLabel>

                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={valueAttendance}
                  onChange={handleChangeAttendance}>
                  <FormControlLabel
                    value="asc"
                    control={<Radio sx={{ ml: '270px' }} />}
                    label={t('COMMON.LOW_TO_HIGH')}
                    labelPlacement="start"
                    sx={{ fontWeight: '500', fontSize: '14px', m: '0px' }}
                  />
                  <FormControlLabel
                    value="desc"
                    labelPlacement="start"
                    sx={{ fontWeight: '500', fontSize: '14px', m: '0px' }}
                    control={<Radio sx={{ ml: '270px' }} />}
                    label={t('COMMON.HIGH_TO_LOW')}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            {/* <Box mt={2}>
              {' '}
              <FormControl>
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  style={{ color: theme.palette.warning['400'] }}>
                  {t('COMMON.CLASS_MISSED')}
                </FormLabel>

                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={valueClassMissed}
                  onChange={handleChangeClassMissed}
                  // style={{ flexDirection: "row" }}
                >
                  <FormControlLabel
                    value="lowToHigh"
                    control={<Radio sx={{ ml: '270px' }} />}
                    label={t('COMMON.LOW_TO_HIGH')}
                    labelPlacement="start"
                    sx={{ fontWeight: '500', fontSize: '14px', m: '0px' }}
                  />
                  <FormControlLabel
                    value="highToLow"
                    labelPlacement="start"
                    sx={{ fontWeight: '500', fontSize: '14px', m: '0px' }}
                    control={<Radio sx={{ ml: '270px' }} />}
                    label={t('COMMON.HIGH_TO_LOW')}
                  />
                </RadioGroup>
              </FormControl>
            </Box> */}
            <Divider
              style={{
                backgroundColor: theme.palette.warning['400'],
                marginBottom: '10px',
                marginTop: '15px'
              }}
            />
          </Box>
        </ModalComponent>
      </Stack>
      {/*------------------student list */}
      <Stack>
        {classData?.map((student, i) => {
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
        <Box display={'flex'} justifyContent={'center'}>
          <Pagination count={limit} page={page} onChange={handleChangePage} />
        </Box>
      </Stack>
    </>
  );
}
