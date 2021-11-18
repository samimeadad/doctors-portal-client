import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const AdminRoute = ( { children, ...rest } ) => {
    const { user, isLoading, admin } = useAuth();
    const location = useLocation();

    if ( isLoading ) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
    }

    if ( user.email && admin ) {
        return children;
    }
    else {
        return ( <Navigate to="/login" state={ { from: location } } /> );
    }

};

export default AdminRoute;