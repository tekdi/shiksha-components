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
import { getUser, editEditUser } from '../services/profileService.ts';
import { useTheme } from '@mui/material/styles';
import defaultUser from '/default_user.png';
import { decodeToken } from '../utils/Helper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserData } from '../utils/Interfaces.ts';
import Loader from '../components/Loader.tsx';

const Profile = () => {
  interface CustomField {
    fieldId: string;
    label: string;
    value: string;
    options: Record<string, any>;
    type: string;
  }

  interface updateCustomField {
    fieldId: string;
    value: string;
  }
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bio, setBio] = useState<string>(
    'Teaching for a decade, my mission is to make math enjoyable and accessible, turning each lesson into a mathematical adventure.'
  );
  const [userData, setUserData] = useState<UserData | null>(null);
  const [updatedName, setUpdatedName] = useState<string | null>(null);
  const [updatedPhone, setUpdatedPhone] = useState<string | null>(null);
  const [updatedEmail, setUpdatedEmail] = useState<string | null>(null);
  const [updatedCustomFields, setUpdatedCustomFields] = useState<updateCustomField[]>([]);
  const [updatedBio, setUpdatedBio] = useState<string | null>(null);

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

  const backButtonEvent = () => {
    window.history.back();
  };
  const handleUpdateClick = async () => {
    try {
      const userDetails = {
        userData: {
          name: updatedName ?? userData?.name,
          // phone: updatedPhone ?? userData?.phone,
          email: updatedEmail ?? userData?.email
        },
        customFields: updatedCustomFields.length > 0 ? updatedCustomFields : customFieldsData
      };
      const userId = localStorage.getItem('userId');
      if (userId) {
        const response = await editEditUser(userId, userDetails);
      }
      setOpen(false);
      // setLoading(true);
    } catch (error) {
      // setLoading(false);

      console.log(error);
    } finally {
      // setLoading(false)
    }
  };
  const handleFieldChange = (fieldId: string, value: string) => {
    const newData: updateCustomField[] = [
      {
        fieldId: fieldId,
        value: value
      }

      // Add more objects as needed
    ];
    setUpdatedCustomFields(newData);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem('userId');

      try {
        if (userId) {
          const response = await getUser(userId);
          const userDataFromJson = response?.result?.userData;
          setUserData(userDataFromJson);
          setCustomFieldsData(response?.result?.userData?.customFields);
          console.log(response?.result?.userData?.customFields);
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
        alignItems={'center'}
      >
        <Box sx={{ flex: '1', minWidth: '100%' }} display="flex" flexDirection="row" gap="5px">
          <ArrowBackIcon onClick={backButtonEvent} />

          <Typography
            variant="h3"
            style={{
              letterSpacing: '0.1px',
              textAlign: 'left',
              marginBottom: '2px'
              // marginBottom:"4px"
              // color: theme.palette.warning['400']
            }}
          >
            {t('PROFILE.MY_PROFILE')}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: '1',
            textAlign: 'center',
            border: '2px solid',
            borderColor: theme.palette.warning['A100']
          }}
          minWidth={'100%'}
          borderRadius={'12px'}
          border={'1px'}
          bgcolor="warning.A400"
          display="flex"
          flexDirection="row"
        >
          <img src={defaultUser} alt="user" style={{ margin: '2px' }} />
          <Box>
            <Typography
              variant="h2"
              sx={{
                marginTop: '35px'
              }}
            >
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
          onClick={handleOpen}
        >
          {t('PROFILE.EDIT_PROFILE')}
        </Button>

        <Box sx={{ flex: '1', minWidth: '100%' }}>
          <Typography
            variant="h3"
            style={{
              letterSpacing: '0.1px',
              textAlign: 'left',
              color: theme.palette.warning['400']
            }}
          >
            {t('PROFILE.CONTACT_INFORMATION')}
          </Typography>

          <Box display="flex" flexDirection="column" gap="10px">
            <Box display="flex" flexDirection="row" gap="10px">
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
                  }}
                >
                  8793607919
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    textAlign: 'left',
                    color: theme.palette.warning['400']
                  }}
                >
                  {t('PROFILE.PHONE')}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="row" gap="10px">
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
                  }}
                >
                  {userData?.email}
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    textAlign: 'left',
                    color: theme.palette.warning['400']
                  }}
                >
                  {t('PROFILE.EMAIL_ID')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: '1', minWidth: '100%' }}>
          {customFieldsData &&
            customFieldsData.map((field) => (
              <Grid item xs={12} key={field.fieldId}>
                {field.type === 'text' && (
                  <Box display="flex" flexDirection="row" gap="10px">
                    <Typography
                      variant="h3"
                      style={{
                        textAlign: 'left',
                        color: theme.palette.warning['400']
                      }}
                    >
                      {field.label}:
                    </Typography>{' '}
                    <Typography
                      variant="h4"
                      style={{
                        letterSpacing: '0.25px',
                        textAlign: 'left'
                      }}
                    >
                      {field.value}
                    </Typography>
                  </Box>
                )}
              </Grid>
            ))}
        </Box>

        <Box sx={{ flex: '1', minWidth: '100%' }}>
          <Typography
            variant="h3"
            style={{
              letterSpacing: '0.1px',
              textAlign: 'left',
              color: theme.palette.warning['400']
            }}
          >
            {t('PROFILE.BIO')}
          </Typography>

          <Typography
            variant="h4"
            style={{
              letterSpacing: '0.1px',
              textAlign: 'left'
            }}
          >
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
          borderRadius={'24px'}
          bgcolor="#E7F3F8"
          p={5}
          display="flex"
          flexDirection="column"
        >
          <Typography
            variant="h2"
            style={{
              textAlign: 'left'
            }}
          >
            {t('PROFILE.INTERVIEW_TEST_SCORES')}
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            marginTop="10px"
            alignItems={'center'}
            justifyContent={'center'}
          >
            <StudentStatsCard
              label1={t('PROFILE.INTERVIEW_TEST_SCORES')}
              value1="82%"
              label2={true}
              value2="02/1/25"
            />
          </Box>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="edit-profile-modal"
          aria-describedby="edit-profile-description"
        >
          <Box sx={style} gap="10px" display="flex" flexDirection="column" borderRadius={'1rem'}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
              }}
            >
              <Typography
                variant="h2"
                style={{
                  textAlign: 'left',
                  color: '#4D4639'
                }}
              >
                {t('PROFILE.EDIT_PROFILE')}
              </Typography>

              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                style={{
                  justifyContent: 'flex-end'
                }}
              >
                <CloseIcon cursor="pointer" />
              </IconButton>
            </Box>
            <Box
              style={{
                overflowY: 'auto'
              }}
              id="modal-modal-description"
            >
              <Box
                sx={{
                  //flex: '1',
                  textAlign: 'center',
                  marginLeft: '5%'
                }}
                borderRadius={'12px'}
                border={'1px'}
                bgcolor="warning.A400"
                display="flex"
                flexDirection="column"
              >
                <img src={defaultUser} alt="user" />
                <Box>
                  <Button
                    sx={{
                      minWidth: '100%',

                      padding: '10px 24px 10px 16px',
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
                  >
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
                onChange={(e) => setUpdatedName(e.target.value)}
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
                onChange={(e) => setUpdatedPhone(e.target.value)}
              />
              <TextField
                label={t('PROFILE.EMAIL_ID')}
                variant="outlined"
                defaultValue={userData?.email}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
              {customFieldsData &&
                customFieldsData.map((field) => (
                  <Grid item xs={12} key={field.fieldId}>
                    {field.type === 'text' && (
                      <TextField
                        fullWidth
                        name={field.fieldId}
                        label={field.label}
                        variant="outlined"
                        defaultValue={field.value}
                        onChange={(e) => handleFieldChange(field.fieldId, e.target.value)}
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
                  minWidth: '100%',

                  color: 'black',
                  backgroundColor: 'containedSecondary',
                  '&:hover': {
                    backgroundColor: 'containedSecondary'
                  }
                }}
                onClick={handleUpdateClick}
                variant="contained"
              >
                {t('COMMON.UPDATE')}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Profile;
