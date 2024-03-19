import React from 'react';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import prathamlogo from '../assets/Pratham Logo white-2.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import '../App.css';
import { login } from '../services/LoginService';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleUsernameChange = (event) => {
        const { value } = event.target;
        const trimmedValue = value.trim();
        setUsername(trimmedValue);
        if (trimmedValue.includes(' ')) {
            setUsernameError(true);
        } else {
            setUsernameError(false);
        }
    };

    const handlePasswordChange = (event) => {
        const { value } = event.target;
        const trimmedValue = value.trim();
        setPassword(trimmedValue);
        if (trimmedValue.includes(' ')) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const isButtonDisabled = !username || !password || usernameError || passwordError;

    const buttonStyle = isButtonDisabled
        ? { color: 'gray', backgroundColor: 'lightgray' }
        : { color: 'black', backgroundColor: '#FBBC13' };

    const loginButtonClick = async (event: any) => {
        event.preventDefault();
        try {
            const response = await login({ username: username, password: password });
            console.log(response);
            if (response) {
                const token = response?.access_token;
                localStorage.setItem('token', JSON.stringify(token));
            }
        }
        catch (error) {
            console.error('error', error);
        }
    }

    return (
        <Box display="flex" flexDirection="column" height="100vh" width="100vw" >
            <Box display={'flex'} flexGrow={1} bgcolor="black" overflow="auto" height="30vh" alignItems={'center'} justifyContent={'center'} zIndex={99} >
                <img src={prathamlogo} />
            </Box>
            <Box flexGrow={1}
                display={'flex'}
                bgcolor="white"
                overflow="auto"
                height="70vh"
                borderRadius={"2rem 2rem 0 0"}
                zIndex={99}
                boxShadow={'0px -5px 15px -6px rgba(0,0,0,0.1)'}
                justifyContent={'center'}
            >
                <Box position={"relative"}>
                    <Box marginY={'1rem'} >
                        <FormControl variant="outlined" fullWidth={true} className="CssTextField" >
                            <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-username"
                                type={'text'}
                                label="Username"
                                placeholder='Enter User Name'
                                value={username}
                                onChange={handleUsernameChange}
                                error={usernameError}
                            />
                        </FormControl>
                    </Box>
                    <Box marginY={'1rem'}>
                        <FormControl variant="outlined" className="CssTextField">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
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
                                placeholder='Enter Password'
                                value={password}
                                onChange={handlePasswordChange}
                                error={passwordError}
                            />
                        </FormControl>
                    </Box>

                    <Box
                        alignContent={'center'}
                        textAlign={"center"}
                    >
                        <Button variant="text"
                            onClick={(event) => loginButtonClick(event)}
                            disabled={isButtonDisabled}
                            style={{
                                ...buttonStyle,
                                width: '100%',
                                height: 'auto',
                                left: 'calc(50% - 50%)',
                                position: "absolute",
                                borderRadius: 100,
                                bottom: "50px",
                                alignContent: 'center',
                                padding: "8px",
                            }} >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginPage
