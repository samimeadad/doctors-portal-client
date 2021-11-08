import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const PrivateRoute = ( { children, ...rest } ) => {
    const { user, isLoading } = useAuth();

    if ( isLoading ) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
    }
    return (
        <Route
            { ...rest }
            render={ ( { location } ) =>
                user?.email ? (
                    children
                ) : (
                    <Redirect
                        to={ {
                            pathname: "/login",
                            state: { from: location }
                        } }
                    />
                )
            }
        />
    );
};

export default PrivateRoute;