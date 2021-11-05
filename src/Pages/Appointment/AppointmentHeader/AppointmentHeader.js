import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import chair from '../../../images/chair.png'
import Calendar from '../../Shared/Calendar/Calendar';

const AppointmentHeader = ( { date, setDate } ) => {
    return (
        <Container>
            <Grid container spacing={ 2 }>
                <Grid item xs={ 12 } md={ 6 }>
                    <Typography variant="h5" sx={ { mb: 4, fontWeight: 'bold', color: "#27c8bc" } }>
                        Pick an Appointment Date
                    </Typography>
                    <Calendar date={ date } setDate={ setDate }></Calendar>
                </Grid>
                <Grid item xs={ 12 } md={ 6 }>
                    <img style={ { width: '100%' } } src={ chair } alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default AppointmentHeader;