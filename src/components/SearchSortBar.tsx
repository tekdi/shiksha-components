import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import ModalComponent from './Modal';
import { Stack } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import shadows from '@mui/material/styles/shadows';

export default function SearchSortBar() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [nestedModalOpen, setNestedModalOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [valueName, setValueName] = React.useState('female');
  const [valueAttendance, setValueAttendance] = React.useState('lowToHigh');
  const [valueClassMissed, setValueClassMissed] = React.useState('lowToHigh');
  const { t } = useTranslation();
  const theme = useTheme<any>();

  const handleChangeNames = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueName(event.target.value);
  };

  const handleChangeAttendance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAttendance(event.target.value);
  };
  const handleChangeClassMissed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueClassMissed(event.target.value);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Box
        display={'flex'}
        mt={3}
        mb={3}
        justifyContent={'space-between'}
        alignItems={'center'}
        boxShadow={'none'}>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
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
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button
          // variant="outlined"
          onClick={handleOpenModal}
          sx={{
            color: theme.palette.warning.A200,
            height: 'auto',
            width: 'auto',
            padding: '6px, 8px, 6px, 16px'
          }}
          endIcon={<ArrowDropDownSharpIcon />}
          size="small"
          variant="outlined"
        >
          {t('COMMON.SORT_BY')}
        </Button>
      </Box>

      {/* ------------------modal for sorting ------------------- */}
      <ModalComponent
        open={modalOpen}
        onClose={handleCloseModal}
        heading={'Sort By'}
        // SubHeading={"Sort"}
        btnText="apply"
      >
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
                style={{ color: theme.palette.warning['400'] }}
              >
                {t('COMMON.NAMES')}
              </FormLabel>

              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valueName}
                onChange={handleChangeNames}
              >
                <FormControlLabel
                  value="aToz"
                  control={<Radio sx={{ ml: '300px' }} />}
                  label="A to Z"
                  labelPlacement="start"
                  sx={{ fontWeight: '500', fontSize: '14px' }}
                />
                <FormControlLabel
                  value="zToA"
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
                style={{ color: theme.palette.warning['400'] }}
              >
                {t('COMMON.ATTENDANCE')}
              </FormLabel>

              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valueAttendance}
                onChange={handleChangeAttendance}
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
          </Box>
          <Box mt={2}>
            {' '}
            <FormControl>
              <FormLabel
                id="demo-controlled-radio-buttons-group"
                style={{ color: theme.palette.warning['400'] }}
              >
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
          </Box>
          <Divider
            style={{
              backgroundColor: theme.palette.warning['400'],
              marginBottom: '10px',
              marginTop: '15px'
            }}
          />
        </Box>
      </ModalComponent>
    </>
  );
}
