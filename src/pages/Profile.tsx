import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header.tsx';
import StudentStatsCard from '../components/StudentStatsCard.tsx';
import { editEditUser, getUser } from '../services/profileService.ts';
import { UserData } from '../utils/Interfaces.ts';
import defaultUser from '/default_user.png';

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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const userDetails = {
        userData: {
          name: updatedName ?? userData?.name,
          email: updatedEmail ?? userData?.email
        },
        customFields: updatedCustomFields.length > 0 ? updatedCustomFields : customFieldsData
      };
      const userId = localStorage.getItem('userId');
      if (userId) {
        await editEditUser(userId, userDetails);
        await fetchUserDetails();
      }
      setOpen(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
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

  const fetchUserDetails = async () => {
    const userId = localStorage.getItem('userId');

    try {
      if (userId) {
        const response = await getUser(userId, "teacher");
        const userDataFromJson = response?.result?.userData;
        setUserData(userDataFromJson);
        setCustomFieldsData(response?.result?.userData?.customFields);
        console.log(response?.result?.userData?.customFields);
      }
    } catch (error) {
      console.error('Error fetching  user details:', error);
    }
  };

  useEffect(() => {
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
        <Box sx={{ flex: '1', minWidth: '100%' }} display="flex" flexDirection="row" gap="5px">
          <ArrowBackIcon onClick={backButtonEvent} sx={{ cursor: 'pointer' }} />

          <Typography
            variant="h3"
            style={{
              letterSpacing: '0.1px',
              textAlign: 'left',
              marginBottom: '2px'
            }}>
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
          flexDirection="row">
          <img
            src={defaultUser}
            alt="user"
            style={{ margin: '2px' }}
            height={'100px'}
            width={'100px'}
          />
          <Box
            sx={{
              marginLeft: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              justifyContent: 'center'
            }}>
            <Typography variant="h2">
              {userData?.name}
              <br />
              {/* {userData?.role} */}
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
          onClick={handleOpen}>
          {t('PROFILE.EDIT_PROFILE')}
        </Button>

        <Box sx={{ flex: '1', minWidth: '100%' }}>
          <Typography
            variant="h3"
            style={{
              letterSpacing: '0.1px',
              textAlign: 'left',
              color: theme.palette.warning['400']
            }}>
            {t('PROFILE.CONTACT_INFORMATION')}
          </Typography>

          <Box display="flex" flexDirection="column" gap="10px">
            <Box display="flex" flexDirection="row" gap="10px">
              {/* <LocalPhoneOutlinedIcon
                style={{
                  marginTop: '9px'
                }}
              /> */}
              <Box display="flex" flexDirection={'column'}>
                {/* <Typography
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
                </Typography> */}
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
      {  
        (<Box sx={{ flex: '1', minWidth: '100%' }}>
          <Typography
            variant="h3"
            style={{
              padding: '10px 0px',
              letterSpacing: '0.1px',
              textAlign: 'left',
              color: theme.palette.warning['400']
            }}>
            {t('PROFILE.OTHER_INFORMATION')}
          </Typography>

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
        </Box>)
}

        <Box sx={{ flex: '1', minWidth: '100%' }}>
          {/* <Typography
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
          </Typography> */}
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
          flexDirection="column">
          <Typography
            variant="h2"
            color={theme.palette.warning['A200']}
            style={{
              textAlign: 'left',
              marginTop: '10px'
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
              label1={t('PROFILE.INTERVIEW_TEST_SCORES')}
              value1="82%"
              label2={true}
              value2="19 Feb, 2024"
            />
          </Box>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="edit-profile-modal"
          aria-describedby="edit-profile-description">
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
                <CloseIcon cursor="pointer" />
              </IconButton>
            </Box>
            <Box
              style={{
                overflowY: 'auto'
              }}
              id="modal-modal-description">
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
                flexDirection="column">
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
                onChange={(e) => setUpdatedName(e.target.value)}
              />
              <TextField
                label={t('PROFILE.PHONE')}
                variant="outlined"
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
                {/* <TextField
                  label={t('PROFILE.BIO')}
                  multiline
                  rows={4}
                  InputProps={{
                    inputProps: { maxLength: 150 }
                  }}
                  value={bio}
                  onChange={handleBioChange}
                  variant="outlined"
                /> */}

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
                variant="contained">
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