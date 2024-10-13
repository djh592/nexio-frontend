'use client';
import React, { useState } from 'react';
import { useTheme, Box, TextField, Button, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';

export default function SignupForm() {
    const theme = useTheme();

    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        email: '',
        phone: ''
    });

    const [Invalid, setInvalid] = useState({
        username: false,
        password: false,
        email: false,
        phone: false
    });

    const handleChange = (prop: keyof typeof formValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Name"
                variant="outlined"
                value={formValues.username}
                onChange={handleChange('username')}
                error={Invalid.username}
                helperText={Invalid.username && "Username must be at least 1 character"}
            />
            <FormControl variant="outlined" error={Invalid.password}>
                <InputLabel htmlFor="outlined-adornment-password" error={Invalid.password}>Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type="password"
                    value={formValues.password}
                    onChange={handleChange('password')}
                    label="Password"
                    error={Invalid.password}
                />
                <FormHelperText>{Invalid.password && "Password must be at least 6 characters"}</FormHelperText>
            </FormControl>
            <TextField
                label="Email"
                variant="outlined"
                value={formValues.email}
                onChange={handleChange('email')}
                error={Invalid.email}
            />
            <TextField
                label="Phone"
                variant="outlined"
                value={formValues.phone}
                onChange={handleChange('phone')}
                error={Invalid.phone}
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
                    const invalidPassword = formValues.password.length < 8;
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
                        alert('Form submitted');
                    }
                }}
            >
                Sign Up
            </Button>
        </Box>
    );
}