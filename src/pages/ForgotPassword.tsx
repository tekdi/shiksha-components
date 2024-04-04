import React from 'react';
import { Box, Button, IconButton, Typography, TextField, Grid, Divider , FormHelperText} from '@mui/material';
import { useState } from 'react';
import '../App.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { styled, useTheme } from '@mui/material/styles';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { maskEmailAddress } from '../utils/Helper';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [resetPassword, setResetPassword] = useState(false);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [changePassword, setchangePassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmpasswordError, setConfirmPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const [charTypeCondition, setCharTypeCondition] = useState(false);
  const [lengthCondition, setlengthCondition] = useState(false);
  const [specialCharCondition, setSpecialCharCondition] = useState(false);
  const [numberCondition, setNumberCondition] = useState(false);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);
  const handleModal = () => setOpenModal(!openModal);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(2)
    }
  }));
  const theme = useTheme<any>();

  const handleClose = () => setOpenModal(false);

  const isButtonDisabled = !resetPassword;
  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    //setConfirmPassword(value);
    if (value === password) {
      setConfirmPasswordError('');
      setResetPassword(true);
    } else {
      setConfirmPasswordError('Passwords do not match');
    }
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value.length);

    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const upperLowercaseCondition = upperCaseRegex.test(value) && lowerCaseRegex.test(value);
    const numberRegex = /\d/;
    const numberCondition = numberRegex.test(value);
    const specialCharRegex = /[!@#$%^&*()\-_=+{}[\]|\\;:'",<.>/?]/;
    const specialCharCondition = specialCharRegex.test(value);
    const LengthCondition = value.length > 8;
    setCharTypeCondition(upperLowercaseCondition);
    setNumberCondition(numberCondition);
    setSpecialCharCondition(specialCharCondition);
    setlengthCondition(LengthCondition);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (passwordRegex.test(value)) {
      setPasswordError(false);
      setPassword(value);
    } else {
      setPasswordError(true);
    }
  };
  const handleUserNameEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNextButtonDisabled(false);
  const value=maskEmailAddress(event.target.value);
  setEmail(value)
  };
  const handleBackButton = () => {
    navigate('/login');
  };
  const handlReset = () => {
    handleClose();
    setchangePassword(true);
  };
  const handleNext = () => {
    handleModal();
  };
  return (
    <Box>
      {!changePassword && (
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          style={{ minHeight: '100vh' }}>
          <Grid item>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ minHeight: '80vh' }}>
              <Box
                gap="10px"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px'
                }}>
                <LockOpenIcon />

                <Typography
                  variant="h1"
                  style={{
                    letterSpacing: '0.1px',
                    textAlign: 'left'
                  }}>
                  {t('LOGIN_PAGE.TROUBLE_WITH_LOGIN')}
                </Typography>

                <Typography
                  variant="h4"
                  style={{
                    letterSpacing: '0.25px',
                    textAlign: 'center',

                    alignItems: 'center'
                  }}>
                  {t('LOGIN_PAGE.ENTER_USERNAME_EMAIL')}
                </Typography>
                <TextField
                  label="Enter username or email"
                  variant="outlined"
                  onChange={handleUserNameEmail}
                />
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth={true}
                  disabled={isNextButtonDisabled}
                  onClick={handleNext}>
                  {t('COMMON.NEXT')}
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Grid item>
            {/* Footer */}
            <Divider sx={{ borderBottomWidth: '0.15rem' }} />

            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ minHeight: '20vh' }}>
              <Button fullWidth={true} onClick={handleBackButton}>
                {' '}
                {t('LOGIN_PAGE.BACK_TO_LOGIN')}
              </Button>{' '}
            </Grid>
          </Grid>
        </Grid>
      )}

      {changePassword && (
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          style={{ minHeight: '100vh' }}>
          <Grid item>
            {/* Content Center */}
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ minHeight: '80vh' }}>
              <Box
                gap="10px"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',

                  alignItems: 'center',

                  padding: '20px'
                }}>
                <LockOpenIcon />

                <Typography
                  variant="h1"
                  style={{
                    letterSpacing: '0.1px',
                    textAlign: 'left'
                    // marginBottom: '2px'
                  }}>
                  {t('LOGIN_PAGE.CREATE_PASSWORD')}
                </Typography>

                <Typography
                  variant="h4"
                  style={{
                    letterSpacing: '0.25px',
                    textAlign: 'center',

                    alignItems: 'center'
                  }}>
                  {t('LOGIN_PAGE.CREATE_NEW_STRONG_PASSWORD')}
                </Typography>
                <TextField
                  label="Enter Password"
                  variant="outlined"
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <FormHelperText>
                    <Typography variant="h4"> {t('LOGIN_PAGE.YOUR_PASSWORD_NEED')}</Typography>
                    <IconButton>
                      {charTypeCondition ? <CheckOutlinedIcon /> : <CloseIcon />}
                      <Typography
                        variant="h4"
                        color={
                          charTypeCondition
                            ? theme.palette.success['main']
                            : theme.palette.error['main']
                        }>
                        {t('LOGIN_PAGE.INCLUDE_UPPER_LOWER_CASE')}
                      </Typography>
                    </IconButton>
                    <IconButton>
                      {numberCondition ? <CheckOutlinedIcon /> : <CloseIcon />}
                      <Typography
                        variant="h4"
                        color={
                          numberCondition
                            ? theme.palette.success['main']
                            : theme.palette.error['main']
                        }>
                        {t('LOGIN_PAGE.INCLUDE_NUMBER')}
                      </Typography>
                    </IconButton>
                    <IconButton>
                      {specialCharCondition ? <CheckOutlinedIcon /> : <CloseIcon />}
                      <Typography
                        variant="h4"
                        color={
                          specialCharCondition
                            ? theme.palette.success['main']
                            : theme.palette.error['main']
                        }>
                        {' '}
                        {t('LOGIN_PAGE.INCLUDE_SPECIAL_CHARACTER')}
                      </Typography>
                    </IconButton>
                    <IconButton>
                      {lengthCondition ? <CheckOutlinedIcon /> : <CloseIcon />}
                      <Typography
                        variant="h4"
                        color={
                          lengthCondition
                            ? theme.palette.success['main']
                            : theme.palette.error['main']
                        }>
                        {t('LOGIN_PAGE.MUST_EIGHT_CHARACTER')}
                      </Typography>
                    </IconButton>
                  </FormHelperText>
                )}
                <TextField
                  error={confirmpasswordError !== ''}
                  id="outlined-error"
                  label="Confirm password"
                  variant="outlined"
                  onChange={handleConfirmPasswordChange}
                  helperText={confirmpasswordError}
                />
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth={true}
                  // onClick={(event) => loginButtonClick(event)}
                  disabled={isButtonDisabled}>
                  {t('LOGIN_PAGE.RESEST_PASSWORD')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
      <BootstrapDialog
        onClose={handleModal}
        aria-labelledby="customized-clear-dialog-title"
        open={openModal}
        sx={{ borderRadius: '16px' }}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-clear-dialog-title">
          <CheckCircleOutlinedIcon sx={{ marginLeft: '45%', marginTop: '10px' }} />
          <Typography variant="h2" sx={{ textAlign: 'center', marginTop: '10px' }}>

            {t('LOGIN_PAGE.WE_SENT_EMAIL', {
                      email: email
                    }) }
          </Typography>
        </DialogTitle>

        <DialogActions>
          <Divider />
          <Button autoFocus variant="contained" type="submit" fullWidth={true} onClick={handlReset}>
            {t('COMMON.OK')}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
};
export default ForgotPassword;
