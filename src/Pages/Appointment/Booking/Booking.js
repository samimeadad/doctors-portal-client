import React from 'react';
import { Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import BookingModal from '../BookingModal/BookingModal';


const Booking = ( { booking, date } ) => {
    const { name, time, space } = booking;
    const [ openBooking, setOpenBooking ] = React.useState( false );
    const handleBookingOpen = () => setOpenBooking( true );
    const handleBookingClose = () => setOpenBooking( false );

    return (
        <>
            <Grid item xs={ 12 } sm={ 12 } md={ 4 }>
                <Paper elevation={ 2 } sx={ { minWidth: 275, p: 4 } }>
                    <Typography variant="h5" component="div" sx={ { color: ' #4ac6bd ' } }>
                        <strong>{ name }</strong>
                    </Typography>
                    <Typography variant="h6" sx={ { color: ' #053431 ', my: 2 } }>
                        { time }
                    </Typography>
                    <Typography sx={ { mb: 1.5 } } color="text.secondary">
                        { space } space available
                    </Typography>
                    <Button onClick={ handleBookingOpen } size="small" variant="contained" sx={ { backgroundColor: ' #27c8bc ' } }>Book Appointment</Button>
                </Paper>
            </Grid>
            <BookingModal
                booking={ booking }
                openBooking={ openBooking }
                handleBookingClose={ handleBookingClose }
                date={ date }
            ></BookingModal>
        </>
    );
};

export default Booking;