import React from 'react';
import { useState } from 'react';
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
  FormHelperText
} from '@mui/material';
import Header from '../components/Header.tsx';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
const Profile = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bio, setBio] = useState<string>(
    'Teaching for a decade, my mission is to make math enjoyable and accessible, turning each lesson into a mathematical adventure.'
  );

  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputBio = event.target.value;
    if (inputBio.length <= 150) {
      setBio(inputBio);
    }
  };
  const charCount = bio.length;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "warning.A400",
    border: "2px solid #000",
    p: 4,
    textAlign: 'center'
  };
  const options = ['Option 1', 'Option 2'];
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Box display="flex" flexDirection="column">
      <Header />
      <Box display="flex" flexDirection="column" padding={2} gap={'10px'}>
        <Box
          sx={{
            flex: '1',
            textAlign: 'center',
            border: '2px solid #D0C5B4',
            marginLeft: '19px'
          }}
          width={"328px"}
          height={"120px"}
          borderRadius={"12px"}
          border={"1px"}
          bgcolor="warning.A400"
          display="flex"
          flexDirection="row"
        >
          <img
            src={'/sample_user.svg'}
            alt="Sample Image"
            style={{ width: '117px', height: '120px' }}
          />
          <Box
            sx={{
              width: '123px',
              height: '40px'
              // textAlign:"center"
            }}
          >
            <Typography
              variant="h2"
              sx={{
                marginTop: '35px'
              }}
            >
              Sushmita Pali
            </Typography>
            <Typography variant="h5">Pune, Maharashtra</Typography>
          </Box>
        </Box>
        <Button
          // variant="contained"
          sx={{
            width: "328px",
            height: "40px",
            padding: "10px 24px 10px 16px",
            gap: "8px",
            borderRadius: "12px",
            marginLeft: "19px",
            marginTop: "10px",
            flex: "1",
            textAlign: "center",
            color: "black",
            border: "1px solid black",
            borderColor: "black",
            backgroundColor: "warning.A400",
            "&:hover": {
              backgroundColor: "warning.A400",
            },
          }}
          startIcon={<CreateOutlinedIcon />}
          onClick={handleOpen}
        >
          {t('PROFILE.EDIT_PROFILE')}
        </Button>

        <Box width="177px" height="120px" sx={{ flex: '1' }}>
          <Typography
            variant="h3"
            style={{
              textAlign: 'left'
            }}
          >
            {t('PROFILE.CONTACT_INFORMATION')}
          </Typography>{' '}
          <Box width="177px" height="120px" display="flex" flexDirection="column" gap="10px">
            <Box width="140px" height="38px" display="flex" flexDirection="row" gap="10px">
              <LocalPhoneOutlinedIcon
                style={{
                  marginTop: '9px'
                }}
              />
              <Typography
                variant="h4"
                style={{
                  letterSpacing: '0.25px',
                  textAlign: 'left'
                }}
              >
                8793607919
                <br />
                <span style={{ color: '#7C766F' }}> {t('PROFILE.PHONE')}</span>
              </Typography>
            </Box>
            <Box width="140px" height="38px" display="flex" flexDirection="row" gap="10px">
              <MailOutlineIcon
                style={{
                  marginTop: '9px'
                }}
              />
              <Typography
                variant="h4"
                style={{
                  letterSpacing: '0.25px',
                  textAlign: 'left'
                }}
              >
                user_id@email.com <br />
                <span style={{ color: '#7C766F' }}>{t('PROFILE.EMAIL_ID')}</span>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box width="328px" height="108px" sx={{ flex: '1' }}>
          <Typography
            variant="h3"
            style={{
              letterSpacing: '0.1px',
              textAlign: 'left'
            }}
          >
            {t('PROFILE.BIO')}
            <br />
            Teaching for a decade, my mission is to make math enjoyable and accessible, turning each
            lesson into a mathematical adventure.
          </Typography>
        </Box>
        <Box
          sx={{
            flex: '1',
            textAlign: 'center',
            marginTop: '15px'
          }}
          // width={326}
          height={120}
          borderRadius={'24px'}
          bgcolor="#E7F3F8"
          boxShadow={6}
          p={3}
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
          <Box display="flex" flexDirection="row" gap="10px" marginTop="10px" marginLeft="15px">
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
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} gap="10px" display="flex" flexDirection="column">
            <Box
              component="h2"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems={'center'}
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
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flex: '1',
                textAlign: 'center',
                marginLeft: '19px'
              }}
              height={"120px"}
              borderRadius={"12px"}
              border={"1px"}
              bgcolor="warning.A400"
              display="flex"
              flexDirection="row"
            >
              <img
                src={'/sample_user.svg'}
                alt="Sample Image"
                style={{ width: '117px', height: '120px' }}
              />
              <Box
                sx={{
                  width: '123px',
                  height: '40px'
                }}
              >
                <Button
                  sx={{
                    marginTop: '35px',
                    textAlign: 'center'
                  }}
                >
                  {t('PROFILE.UPDATE_PICTURE')}
                </Button>
              </Box>
            </Box>
            <TextField
              label={t('PROFILE.FULL_NAME')}
              variant="outlined"
              defaultValue="Sushmita Patil"
            />
            <Autocomplete
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
            />
            <TextField label={t('PROFILE.PHONE')} variant="outlined" defaultValue="+91 000000000" />
            <TextField
              label={t('PROFILE.EMAIL_ID')}
              variant="outlined"
              defaultValue="user_id@email.com"
            />
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
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                sx={{
                  width: "328px",
                  height: "40px",
                  color: "black",
                  backgroundColor: "containedSecondary",
                  "&:hover": {
                    backgroundColor: "containedSecondary",
                  },
                }}
                variant="contained"
              >
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
