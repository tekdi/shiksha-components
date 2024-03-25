import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const Header: React.FC = () => {
  const [language, setLanguage] = React.useState('');
  const { t } = useTranslation();
  const theme = useTheme<any>();

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };

  return (
    <>
      <Stack
        sx={{ minWidth: 360 }}
        direction="row"
        justifyContent={'space-between'}
        // bgcolor="white"
        padding={'1rem'}
        height="auto"
      >
        <FormControl>
          <InputLabel>{t('COMMON.LANGUAGE')}</InputLabel>
          <Select
            value={language}
            label="Language"
            style={{
              borderRadius: '20px',
              color: theme.palette.warning['200'],
              width: '5rem',
              height: '0.5 rem'
            }}
            onChange={handleChange}
          >
            <MenuItem value="English">EN</MenuItem>
            <MenuItem value="Hindi">HI</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ margin: '0 auto' }}>
          <img src="/appLogo.svg" alt="logo" />
        </Box>
        <Box>
          <AccountCircleIcon fontSize="large" color="action" />
        </Box>
      </Stack>
      <Divider sx={{ borderBottomWidth: '0.25rem' }} />
    </>
  );
};
export default Header;
