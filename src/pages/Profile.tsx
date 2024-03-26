import React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import StudentStatsCard from '../components/StudentStatsCard.tsx';
import {
  TextField,
  Button,
  Typography,
  Box,
  Autocomplete,
  IconButton,
  FormHelperText,
  Grid
} from '@mui/material';
import Header from '../components/Header.tsx';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { getUser } from '../services/profileService.ts';
import { useTheme } from '@mui/material/styles';
import default_user from '../../public/default_user.png';
import { decodeToken } from '../utils/Helper';

const Profile = () => {
  interface UserData {
    id: number;
    name: string;
    role: string;
    district: string;
    state: string;
    email: string;
  }
  interface CustomField {
    fieldId: string;
    label: string;
    value: string;
    options: Record<string, any>;
    type: string;
  }
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bio, setBio] = useState<string>(
    'Teaching for a decade, my mission is to make math enjoyable and accessible, turning each lesson into a mathematical adventure.'
  );
  const [userData, setUserData] = useState<UserData | null>(null);
  const [customFieldsData, setCustomFieldsData] = useState<CustomField[]>([]);

  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputBio = event.target.value;
    if (inputBio.length <= 150) {
      setBio(inputBio);
    }
  };
  const charCount = bio.length;
  const theme = useTheme<any>();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'warning.A400',
    p: 4,
    textAlign: 'center',
    height: '85vh'
  };
  const options = ['Option 1', 'Option 2'];
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        if (token) {
          const payload = decodeToken(token);
          const xHasuraUserId = payload['https://hasura.io/jwt/claims']['x-hasura-user-id'];
          // console.log(xHasuraUserId);
          const response = await getUser(xHasuraUserId);
          const userDataFromJson = response?.result?.userData;
          setUserData(userDataFromJson);
          setCustomFieldsData(response?.result?.customFields);
          console.log(response);
        }
      } catch (error) {
        console.error('Error fetching  user details:', error);
      }
    };
    fetchUserDetails();
  }, []);
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" minWidth={'100%'}>
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        padding={2}
        gap={'10px'}
        justifyContent={'center'}
        alignItems={'center'}>
        <Box
          sx={{
            flex: '1',
            textAlign: 'center',
            border: '2px solid #D0C5B4'
          }}
          minWidth={'100%'}
          height={'120px'}
          borderRadius={'12px'}
          border={'1px'}
          bgcolor="warning.A400"
          display="flex"
          flexDirection="row">
          <img
            src={default_user}
            alt="user"
            style={{ width: '117px', height: '120px', margin: '2px' }}
          />
          <Box
            sx={{
              width: '123px',
              height: '40px'
            }}>
            <Typography
              variant="h2"
              sx={{
                marginTop: '35px'
              }}>
              {userData?.name}
              <br />
              {userData?.role}
            </Typography>
            <Typography variant="h5">
              {userData?.district}, {userData?.state}
            </Typography>
          </Box>
        </Box>
        <Button
          sx={{
            minWidth: '100%',

            height: '40px',
            padding: '10px 24px 10px 16px',
            gap: '8px',
            borderRadius: '12px',
            marginTop: '10px',
            flex: '1',
            textAlign: 'center',
            color: 'black',
            border: '1px solid black',
            borderColor: 'black',
            backgroundColor: 'warning.A400',
            '&:hover': {
              backgroundColor: 'warning.A400'
            }
          }}
          startIcon={<CreateOutlinedIcon />}
          onClick={handleOpen}>
          {t('PROFILE.EDIT_PROFILE')}
        </Button>

        <Box width="328px" height="108px" sx={{ flex: '1', minWidth: '100%' }}>
          <Typography
            variant="h3"
            style={{
              letterSpacing: '0.1px',
              textAlign: 'left',
              color: theme.palette.warning['400']
            }}>
            {t('PROFILE.CONTACT_INFORMATION')}
          </Typography>

          <Box width="177px" height="120px" display="flex" flexDirection="column" gap="10px">
            <Box width="140px" height="38px" display="flex" flexDirection="row" gap="10px">
              <LocalPhoneOutlinedIcon
                style={{
                  marginTop: '9px'
                }}
              />
              <Box display="flex" flexDirection={'column'}>
                <Typography
                  variant="h4"
                  style={{
                    letterSpacing: '0.25px',
                    textAlign: 'left'
                  }}>
                  8793607919
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    textAlign: 'left',
                    color: theme.palette.warning['400']
                  }}>
                  {t('PROFILE.PHONE')}
                </Typography>
              </Box>
            </Box>
            <Box width="140px" height="38px" display="flex" flexDirection="row" gap="10px">
              <MailOutlineIcon
                style={{
                  marginTop: '9px'
                }}
              />

              <Box display="flex" flexDirection={'column'}>
                <Typography
                  variant="h4"
                  style={{
                    letterSpacing: '0.25px',
                    textAlign: 'left'
                  }}>
                  {userData?.email}
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    textAlign: 'left',
                    color: theme.palette.warning['400']
                  }}>
                  {t('PROFILE.EMAIL_ID')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box width="328px" height="108px" sx={{ flex: '1', minWidth: '100%' }}>
          {customFieldsData.map((field) => (
            <Grid item xs={12} key={field.fieldId}>
              {field.type === 'text' && (
                <Box display="flex" flexDirection="row" gap="10px">
                  <Typography
                    variant="h3"
                    style={{
                      textAlign: 'left',
                      color: theme.palette.warning['400']
                    }}>
                    {field.label}:
                  </Typography>{' '}
                  <Typography
                    variant="h4"
                    style={{
                      letterSpacing: '0.25px',
                      textAlign: 'left'
                    }}>
                    {field.value}
                  </Typography>
                </Box>
              )}
            </Grid>
          ))}
        </Box>

        <Box width="328px" height="108px" sx={{ flex: '1', minWidth: '100%' }}>
          <Typography
            variant="h3"
            style={{
              letterSpacing: '0.1px',
              textAlign: 'left',
              color: theme.palette.warning['400']
            }}>
            {t('PROFILE.BIO')}
          </Typography>

          <Typography
            variant="h4"
            style={{
              letterSpacing: '0.1px',
              textAlign: 'left'
            }}>
            Teaching for a decade, my mission is to make math enjoyable and accessible, turning each
            lesson into a mathematical adventure.
          </Typography>
        </Box>
        <Box
          sx={{
            flex: '1',
            textAlign: 'center',
            marginTop: '15px',
            minWidth: '100%',
            padding: '10px'
          }}
          //width={326}
          height={120}
          borderRadius={'24px'}
          bgcolor="#E7F3F8"
          p={5}
          display="flex"
          flexDirection="column">
          <Typography
            variant="h2"
            style={{
              textAlign: 'left'
            }}>
            {t('PROFILE.INTERVIEW_TEST_SCORES')}
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            marginTop="10px"
            alignItems={'center'}
            justifyContent={'center'}>
            <StudentStatsCard
              label1="Interview Score"
              value1="82%"
              label2={true}
              value2="02/1/25"
            />

            <StudentStatsCard
              label1="Interview Score"
              value1="82%"
              label2={true}
              value2="02/1/25"
            />
          </Box>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style} gap="10px" display="flex" flexDirection="column" borderRadius={'1rem'}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
              }}>
              <Typography
                variant="h2"
                style={{
                  textAlign: 'left',
                  color: '#4D4639'
                }}>
                {t('PROFILE.EDIT_PROFILE')}
              </Typography>

              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                style={{
                  justifyContent: 'flex-end'
                }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              style={{
                overflowY: 'auto'
              }}>
              <Box
                sx={{
                  flex: '1',
                  textAlign: 'center',
                  marginLeft: '19px'
                }}
                height={'120px'}
                borderRadius={'12px'}
                border={'1px'}
                bgcolor="warning.A400"
                display="flex"
                flexDirection="row">
                <img src={default_user} alt="user" />
                <Box
                  sx={{
                    width: '123px',
                    height: '40px'
                  }}>
                  <Button
                    sx={{
                      marginTop: '35px',
                      textAlign: 'center'
                    }}>
                    {t('PROFILE.UPDATE_PICTURE')}
                  </Button>
                </Box>
              </Box>
              <TextField
                sx={{
                  marginTop: '20px'
                }}
                label={t('PROFILE.FULL_NAME')}
                variant="outlined"
                defaultValue={userData?.name}
              />
              {/* <Autocomplete
              value={value}
              onChange={(event: any, newValue: string | null) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={options}
              renderInput={(params) => <TextField {...params} label={t('PROFILE.LOCATION')} />}
            /> */}
              <TextField
                label={t('PROFILE.PHONE')}
                variant="outlined"
                defaultValue="+91 000000000"
              />
              <TextField
                label={t('PROFILE.EMAIL_ID')}
                variant="outlined"
                defaultValue={userData?.email}
              />
              {customFieldsData.map((field) => (
                <Grid item xs={12} key={field.fieldId}>
                  {field.type === 'text' && (
                    <TextField
                      fullWidth
                      name={field.fieldId}
                      label={field.label}
                      variant="outlined"
                      value={field.value}
                    />
                  )}
                </Grid>
              ))}
              <Box>
                <TextField
                  label={t('PROFILE.BIO')}
                  multiline
                  rows={4}
                  InputProps={{
                    inputProps: { maxLength: 150 }
                  }}
                  value={bio}
                  onChange={handleBioChange}
                  // helperText={`${charCount}/150`}

                  variant="outlined"
                />

                <FormHelperText style={{ textAlign: 'right' }}>{`${charCount}/150`}</FormHelperText>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                sx={{
                  width: '328px',
                  height: '40px',
                  color: 'black',
                  backgroundColor: 'containedSecondary',
                  '&:hover': {
                    backgroundColor: 'containedSecondary'
                  }
                }}
                variant="contained">
                {t('PROFILE.UPDATE')}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Profile;
