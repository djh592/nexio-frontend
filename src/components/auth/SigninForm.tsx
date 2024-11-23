'use client';
import React, { useEffect, useState } from 'react';
import { useTheme, Box, TextField, Button, FormControl, InputLabel, OutlinedInput, FormHelperText, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { setToken, setUserId, setUserName, setUserEmail, setUserPhone, setUserAvatar } from '@/lib/features/auth/authSlice';
import { postLogin } from '@/lib/api';

export default function SigninForm() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
    });

    const [invalid, setInvalid] = useState({
        username: false,
        password: false,
    });

    const handleChange = (prop: keyof typeof formValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

    const [successAlert, setSuccessAlert] = useState({
        open: false,
        message: '',
    });

    useEffect(() => {
        if (successAlert.open) {
            setTimeout(() => {
                setSuccessAlert({ open: false, message: '' });
            }, 2000);
        }
    }, [successAlert]);

    const [errorAlert, setErrorAlert] = useState({
        open: false,
        message: '',
    });

    useEffect(() => {
        if (errorAlert.open) {
            setTimeout(() => {
                setErrorAlert({ open: false, message: '' });
            }, 2000);
        }
    }, [errorAlert]);

    const submitForm = () => {
        postLogin({
            userName: formValues.username,
            password: formValues.password,
        })
            .then((res) => {
                if (Number(res.code) === 0) {
                    dispatch(setToken(res.token));
                    dispatch(setUserId(res.user.userId));
                    dispatch(setUserName(res.user.userName));
                    dispatch(setUserPhone(res.user.phoneNumber));
                    dispatch(setUserEmail(res.user.emailAddress));
                    dispatch(setUserAvatar(res.user.avatarUrl));
                    setSuccessAlert({ open: true, message: 'Login successful!' });
                    router.push('/chats');
                }
                else {
                    setErrorAlert({ open: true, message: 'Login failed: ' + res.info });
                }
            })
            .catch((err) => {
                setErrorAlert({ open: true, message: 'Login failed: ' + err });
            });
    };

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Name"
                variant="outlined"
                value={formValues.username}
                onChange={handleChange('username')}
                error={invalid.username}
                helperText={invalid.username && "Please enter your username"}
            />
            <FormControl variant="outlined" error={invalid.password}>
                <InputLabel htmlFor="outlined-adornment-password" error={invalid.password}>Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type="password"
                    value={formValues.password}
                    onChange={handleChange('password')}
                    label="Password"
                    error={invalid.password}
                />
                <FormHelperText>{invalid.password && "Please enter your password"}</FormHelperText>
            </FormControl>
            <Button
                sx={{
                    height: '56px',
                    backgroundColor: theme.palette.primary.light,
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                    },
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                }}
                variant="contained"
                color="primary"
                onClick={() => {
                    const invalidUsername = formValues.username === '';
                    const invalidPassword = formValues.password === '';
                    const isValid = !invalidUsername && !invalidPassword;
                    setInvalid({
                        username: invalidUsername,
                        password: invalidPassword,
                    });
                    if (isValid) {
                        submitForm();
                    }
                }}
            >
                Sign In
            </Button>
            {successAlert.open && <Alert severity="success">{successAlert.message}</Alert>}
            {errorAlert.open && <Alert severity="error">{errorAlert.message}</Alert>}
        </Box>
    );
}