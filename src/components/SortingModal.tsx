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
  Grid,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import ModalComponent from './Modal';
import { Stack } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import shadows from '@mui/material/styles/shadows';

interface sortCardProps {
  handleSorting: (sortByName: string, sortByAttendance: string) => void;
  handleCloseModal: () => void;
  isModalOpen: boolean;
}

const SortingModal: React.FC<sortCardProps> = ({
  handleSorting,
  isModalOpen,
  handleCloseModal
}) => {
  const [sortByName, setsortByName] = React.useState('asc');
  const [sortByAttendance, setsortByAttendance] = React.useState('');
  const { t } = useTranslation();
  const theme = useTheme<any>();

  // handle changes names from sorting
  const handleChangeSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsortByAttendance('');
    if (event.target.value === 'asc' || event.target.value === 'desc') {
      setsortByName(event.target.value);
    } else {
      setsortByAttendance(event.target.value);
    }
  };

  // handle chnage attandance in sorting
  const handleChangeAttendance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsortByAttendance(event.target.value);
    setsortByName('');
  };

  const handleApplySort = () => {
    handleSorting(sortByName, sortByAttendance);
    handleCloseModal();
  };

  return (
    <ModalComponent
      open={isModalOpen}
      onClose={handleCloseModal}
      heading={t('COMMON.SORT_BY')}
      handleApplySort={handleApplySort}
      btnText={t('COMMON.APPLY')}>
      <Divider
        style={{
          backgroundColor: theme.palette.warning['400'],
          marginBottom: '10px',
          marginTop: '15px'
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel style={{ color: theme.palette.warning['400'] }} component="legend">
              {t('COMMON.NAMES')}
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              //           name="controlled-radio-buttons-group"
              //           value={sortByName}
              //           onChange={handleChangeSort}
              aria-label="sortByName"
              name="sortByName"
              value={sortByName}
              onChange={handleChangeSort}>
              <FormControlLabel
                labelPlacement="start"
                value="asc"
                control={<Radio sx={{ ml: '120px' }} />}
                label={t('COMMON.ATOZ')}
              />

              <FormControlLabel
                labelPlacement="start"
                value="desc"
                control={<Radio sx={{ ml: '120px' }} />}
                label={t('COMMON.ZTOA')}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel style={{ color: theme.palette.warning['400'] }} component="legend">
              {t('COMMON.ATTENDANCE')}
            </FormLabel>
            <RadioGroup
              aria-label="sortByAttendance"
              name="sortByAttendance"
              value={sortByAttendance}
              onChange={handleChangeAttendance}>
              <FormControlLabel
                labelPlacement="start"
                value="asc"
                control={<Radio sx={{ ml: '80px' }} />}
                label={t('COMMON.LOWTOHIGH')}
              />
              <FormControlLabel
                labelPlacement="start"
                value="desc"
                control={<Radio sx={{ ml: '80px' }} />}
                label={t('COMMON.HIGHTOLOW')}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Divider
        style={{
          backgroundColor: theme.palette.warning['400'],
          marginBottom: '10px',
          marginTop: '15px'
        }}
      />
    </ModalComponent>
  );
};

export default SortingModal;
