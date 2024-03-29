import React from 'react';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import config from '../config.json';
import { useNavigate } from 'react-router-dom';
import appLogo from '/appLogo.svg';

const Header: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem('preferredLanguage') || 'en'
  );
  const [language, setLanguage] = useState(selectedLanguage);
  const navigate = useNavigate();

  const { i18n } = useTranslation();
  const theme = useTheme<any>();
  const handleChange = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem('preferredLanguage', value);
  };
  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <>
      <Stack
        sx={{ minWidth: '100%' }}
        direction="row"
        justifyContent={'space-between'}
        alignItems={'center'}
        height="auto"
      >
        <Box mt={'0.5rem'}>
          <FormControl sx={{ m: 1 }}>
            <Select
              className="SelectLanguages"
              value={language}
              onChange={(event) => handleChange(event.target.value)}
              displayEmpty
              style={{
                borderRadius: '0.5rem',
                color: theme.palette.warning['200'],
                width: '5rem',
                marginBottom: '0rem'
              }}
            >
              {config?.languages.map((lang) => (
                <MenuItem value={lang.code} key={lang.code}>
                  {lang.code.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ margin: '0 auto' }}>
          <img src={appLogo} alt="logo" />
        </Box>
        <Box onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          <AccountCircleIcon fontSize="large" color="action" />
        </Box>
      </Stack>
      <Divider sx={{ borderBottomWidth: '0.15rem' }} />
    </>
  );
};
export default Header;
