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
  const [sortByName, setsortByName] = React.useState('');
  const [sortByAttendance, setsortByAttendance] = React.useState('');
  const { t } = useTranslation();
  const theme = useTheme<any>();

  // handle changes names from sorting
  const handleChangeNames = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsortByName(event.target.value);
  };

  // handle chnage attandance in sorting
  const handleChangeAttendance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsortByAttendance(event.target.value);
  };

  const handleApplySort = () => {
    handleSorting(sortByName, sortByAttendance);
    handleCloseModal();
  };

  return (
    <>
      {/* ------------------modal for sorting ------------------- */}
      <ModalComponent
        open={isModalOpen}
        onClose={handleCloseModal}
        heading={'Sort By'}
        handleApplySort={handleApplySort}
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
                value={sortByName}
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
                value={sortByAttendance}
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
    </>
  );
};

export default SortingModal;
