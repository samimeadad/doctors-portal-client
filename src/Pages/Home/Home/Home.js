import { Box } from '@mui/material';
import React from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';

const Home = () => {

    return (
        <Box sx={ { textAlign: 'center' } }>
            <Banner></Banner>
            <Services></Services>
            <AppointmentBanner></AppointmentBanner>
        </Box>
    );
};

export default Home;    