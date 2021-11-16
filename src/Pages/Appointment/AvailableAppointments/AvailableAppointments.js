import { Alert, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Booking from '../Booking/Booking';

const bookings = [
    {
        id: 1,
        name: "Teeth Orthodontics",
        time: '08:00 AM - 09:00 AM',
        price: 20,
        space: 4,
    },
    {
        id: 2,
        name: "Cosmetic Dentistry",
        time: '10:05 AM - 11:30 AM',
        price: 15,
        space: 8,
    },
    {
        id: 3,
        name: "Teeth Cleaning",
        time: '12:00 PM - 01:00 PM',
        price: 17,
        space: 6,
    },
    {
        id: 4,
        name: "Cavity Protection",
        time: '02:00 PM - 03:00 PM',
        price: 19,
        space: 5,
    },
    {
        id: 5,
        name: "Teeth Scaling",
        time: '04:00 PM - 05:00 PM',
        price: 18,
        space: 7,
    },
    {
        id: 6,
        name: "Teeth Root Cannel",
        time: '07:00 PM - 10:00 PM',
        price: 35,
        space: 3,
    },

]

const AvailableAppointments = ( { date } ) => {
    const [ bookingSuccess, setBookingSuccess ] = useState( false );

    return (
        <Container sx={ { my: 10 } }>
            <Typography variant="h4" sx={ { mb: 6, color: "#27c8bc", fontWeight: 'bold' } }>
                Available Appointments on <span style={ { color: 'red', fontWeight: 'bold' } }>{ date.toDateString() }</span>
            </Typography>
            { bookingSuccess && <Alert severity="success">Appointment Booked Successfully!</Alert> }
            <Grid container spacing={ 4 }>
                {
                    bookings.map( booking => <Booking
                        key={ booking.id }
                        booking={ booking }
                        date={ date }
                        setBookingSuccess={ setBookingSuccess }
                    ></Booking> )
                }
            </Grid>
        </Container>
    );
};

export default AvailableAppointments;