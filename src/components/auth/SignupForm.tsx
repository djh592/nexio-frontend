'use client';
import React, { useEffect, useState } from 'react';
import { useTheme, Box, TextField, Button, FormControl, InputLabel, OutlinedInput, FormHelperText, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { setToken, setUser } from '@/lib/features/auth/authSlice';
import { postRegister } from '@/lib/api';
import { upsertUser } from '@/lib/storage';

export default function SignupForm() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        email: '',
        phone: ''
    });

    const [invalid, setInvalid] = useState({
        username: false,
        password: false,
        email: false,
        phone: false
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
        postRegister({
            userName: formValues.username,
            password: formValues.password,
            emailAddress: formValues.email,
            phoneNumber: formValues.phone
        })
            .then((res) => {
                if (Number(res.code) === 0) {
                    const token = res.token;
                    const user = res.user;
                    dispatch(setToken(token));
                    dispatch(setUser(user));
                    setSuccessAlert({ open: true, message: 'Signup successful!' });
                    upsertUser(user);
                    router.push('/chats');
                } else {
                    setErrorAlert({ open: true, message: 'Signup failed: ' + res.info });
                }
            })
            .catch((err) => {
                setErrorAlert({ open: true, message: 'Signup failed: ' + err });
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
                helperText={invalid.username && "Username must be at least 1 character"}
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
                <FormHelperText>{invalid.password && "Password must be at least 6 characters"}</FormHelperText>
            </FormControl>
            <TextField
                label="Email"
                variant="outlined"
                value={formValues.email}
                onChange={handleChange('email')}
                error={invalid.email}
            />
            <TextField
                label="Phone"
                variant="outlined"
                value={formValues.phone}
                onChange={handleChange('phone')}
                error={invalid.phone}
            />
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
                    const invalidPassword = formValues.password.length < 6;
                    const invalidEmail = false;
                    const invalidPhone = false;
                    const isValid = !invalidUsername && !invalidPassword && !invalidEmail && !invalidPhone;
                    setInvalid({
                        username: invalidUsername,
                        password: invalidPassword,
                        email: invalidEmail,
                        phone: invalidPhone
                    });
                    if (isValid) {
                        submitForm();
                    }
                }}
            >
                Sign Up
            </Button>
            {successAlert.open && <Alert severity="success">{successAlert.message}</Alert>}
            {errorAlert.open && <Alert severity="error">{errorAlert.message}</Alert>}
        </Box>
    );
}