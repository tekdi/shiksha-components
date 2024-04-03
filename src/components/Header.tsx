import React from 'react';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, Stack, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import config from '../config.json';
import { useNavigate } from 'react-router-dom';
import appLogo from '/appLogo.svg';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { styled, alpha } from '@mui/material/styles';
import { MenuProps } from '@mui/material/Menu';
import Menu from '@mui/material/Menu';

interface MyheaderComponentProps {
  fromProfilePage?: boolean; 
}
const Header: React.FC<MyheaderComponentProps> = ({ fromProfilePage = false }) => {
  const [language, setLanguage] = useState(localStorage.getItem('preferredLanguage') || 'en');
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0'
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5)
        },
        '&:active': {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
        }
      }
    }
  }));

  const theme = useTheme<any>();
  const handleChange = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem('preferredLanguage', value);
  };
  const handleProfileClick = () => {
    if(!fromProfilePage)
    {
      navigate('/profile');

    }

  };
  const handleLogoutClick = () => {
    navigate('/logout');
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <Box mt={'0.5rem'} paddingLeft={'1rem'}>
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
          <img
            src={appLogo}
            alt="logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
        </Box>
        <Box
          onClick={handleClick}
          sx={{ cursor: 'pointer', position: 'relative' }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          paddingRight={'1rem'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          mt={'0.5rem'}
        >
          <AccountCircleIcon fontSize="large" color="action" />
          <Typography>{t('PROFILE.MY_PROFILE')}</Typography>
        </Box>
        <div>
          <StyledMenu
            id="profile-menu"
            MenuListProps={{
              'aria-labelledby': 'profile-button'
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfileClick} disableRipple>
              <PersonOutlineOutlinedIcon />
              {t('PROFILE.MY_PROFILE')}{' '}
            </MenuItem>
            <MenuItem onClick={handleLogoutClick} disableRipple>
              <LogoutOutlinedIcon />
              {t('COMMON.LOGOUT')}
            </MenuItem>
          </StyledMenu>
        </div>
      </Stack>
      <Divider sx={{ borderBottomWidth: '0.15rem' }} />
    </>
  );
};
export default Header;
