import React from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import appLogo from '../assets/appLogo.svg';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import '../App.css';
import { login } from '../services/LoginService';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const trimmedValue = value.trim();
    setUsername(trimmedValue);
    if (trimmedValue.includes(' ')) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const isButtonDisabled = !username || !password || usernameError || passwordError;

  const buttonStyle = isButtonDisabled
    ? { color: 'gray', backgroundColor: 'lightgray' }
    : { color: 'black', backgroundColor: '#FBBC13' };

  const loginButtonClick = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await login({ username: username, password: password });
      console.log(response);
      if (response) {
        const token = response?.access_token;
        localStorage.setItem('token', JSON.stringify(token));
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100vw" bgcolor={'black'}>
      <Box
        display={'flex'}
        flexGrow={1}
        bgcolor="black"
        overflow="auto"
        height="30vh"
        alignItems={'center'}
        justifyContent={'center'}
        zIndex={99}
      >
        <img src={appLogo} />
      </Box>
      <Box
        flexGrow={1}
        display={'flex'}
        bgcolor="white"
        overflow="auto"
        height="70vh"
        borderRadius={'2rem 2rem 0 0'}
        zIndex={99}
        boxShadow={'0px -5px 15px -6px rgba(0,0,0,0.1)'}
        justifyContent={'center'}
      >
        <Box position={'relative'}>
          <Box marginY={'1rem'}>
            <FormControl variant="outlined" fullWidth={true} className="CssTextField">
              <InputLabel htmlFor="outlined-adornment-username">
                {t('LOGIN_PAGE.USERNAME')}
              </InputLabel>
              <OutlinedInput
                type={'text'}
                label="Username"
                placeholder="Enter User Name"
                value={username}
                onChange={handleUsernameChange}
                error={usernameError}
              />
            </FormControl>
          </Box>
          <Box marginY={'1rem'}>
            <FormControl variant="outlined" className="CssTextField">
              <InputLabel htmlFor="outlined-adornment-password">
                {t('LOGIN_PAGE.PASSWORD')}
              </InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
              />
            </FormControl>
          </Box>

          <Box
            alignContent={'center'}
            textAlign={'center'}
            position={'absolute'}
            bottom={'1rem'}
            width={'100%'}
          >
            <Button
              variant="contained"
              fullWidth={true}
              onClick={(event) => loginButtonClick(event)}
              disabled={isButtonDisabled}
              // style={{
              //   ...buttonStyle,
              //   width: '100%',
              //   height: 'auto',
              //   left: 'calc(50% - 50%)',
              //   position: 'absolute',
              //   borderRadius: 100,
              //   bottom: '50px',
              //   alignContent: 'center',
              //   padding: '8px'
              // }}
            >
              {t('LOGIN_PAGE.LOGIN')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
