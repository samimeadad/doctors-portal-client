import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import loginImage from '../../../images/login.png';

const Login = () => {
    const [ loginData, setLoginData ] = useState( {} );
    const { user, loginUser, isLoading, authError } = useAuth();
    const history = useHistory();
    const location = useLocation();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        console.log( field, value );
        const newLoginData = { ...loginData };
        newLoginData[ field ] = value;
        setLoginData( newLoginData );
        e.preventDefault();
    }

    const handleLoginFormSubmit = e => {
        loginUser( loginData.email, loginData.password, location, history );
        e.preventDefault();
    }
    return (
        <Container sx={ { my: 10 } }>
            <Grid container spacing={ 2 }>
                <Grid item sx={ { mt: 10 } } xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                    <Typography sx={ { m: 1 } } variant="h6" gutterBottom component="div">
                        Login
                    </Typography>
                    <form onSubmit={ handleLoginFormSubmit }>
                        <TextField
                            sx={ { width: 1, m: 1 } }
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            onChange={ handleOnChange }
                            variant="standard"
                        />
                        <TextField
                            sx={ { width: 1, m: 1 } }
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            name="password"
                            onChange={ handleOnChange }
                            variant="standard"
                        />
                        <Button
                            sx={ { width: 1, m: 1 } }
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Login
                        </Button>
                        <NavLink style={ { textDecoration: 'none' } } to="/register"><Button variant="text">New User? Please Register</Button></NavLink>
                    </form>
                    { isLoading && <CircularProgress /> }
                    { user?.email && <Alert severity="success">User Logged-in Successfully!</Alert> }
                    { authError && <Alert severity="error">{ authError }</Alert> }
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                    <img style={ { width: '100%' } } src={ loginImage } alt="loginImage" />
                </Grid>

            </Grid>
        </Container>
    );
};

export default Login;