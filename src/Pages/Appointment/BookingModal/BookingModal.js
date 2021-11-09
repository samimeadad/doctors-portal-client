import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import useAuth from '../../../Hooks/useAuth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BookingModal = ( { openBooking, handleBookingClose, booking, date, setBookingSuccess } ) => {
    const { name, time } = booking;
    const { user } = useAuth();
    const initialBookingInfo = {
        patientName: user.displayName,
        phoneNumber: '',
        email: user.email
    }
    const [ bookingInfo, setBookingInfo ] = useState( initialBookingInfo )

    const handleBookingSubmit = e => {
        e.preventDefault();

        //Collect data
        const appointment = {
            ...bookingInfo,
            time,
            serviceName: name,
            date: date.toLocaleDateString()
        }
        //send to the server
        fetch( 'https://salty-reef-03503.herokuapp.com/appointments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify( appointment )
        } )
            .then( res => res.json() )
            .then( data => {
                if ( data.insertedId ) {
                    setBookingSuccess( true );
                    handleBookingClose();
                }
            } )
    };

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newBookingInfo = { ...bookingInfo };
        newBookingInfo[ field ] = value;
        setBookingInfo( newBookingInfo )
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={ openBooking }
            onClose={ handleBookingClose }
            closeAfterTransition
            BackdropComponent={ Backdrop }
            BackdropProps={ {
                timeout: 500,
            } }
        >
            <Fade in={ openBooking }>
                <Box sx={ style }>
                    <Typography id="transition-modal-title" variant="h6" component="h2" sx={ { color: "27c8bc", mb: 2 } }>
                        { name }
                    </Typography>
                    <form onSubmit={ handleBookingSubmit }>
                        <TextField
                            disabled
                            sx={ { width: '100%', mb: 1 } }
                            id="outlined-size-small"
                            defaultValue={ time }
                            size="small"
                        />
                        <TextField
                            sx={ { width: '100%', mb: 1 } }
                            id="outlined-size-small"
                            size="small"
                            name="patientName"
                            onBlur={ handleOnBlur }
                            defaultValue={ user.displayName }
                        />
                        <TextField
                            sx={ { width: '100%', mb: 1 } }
                            id="outlined-size-small"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            onBlur={ handleOnBlur }
                            size="small"
                        />
                        <TextField
                            sx={ { width: '100%', mb: 1 } }
                            id="outlined-size-small"
                            name="email"
                            defaultValue={ user.email }
                            onBlur={ handleOnBlur }
                            size="small"
                        />
                        <TextField
                            disabled
                            sx={ { width: '100%', mb: 1 } }
                            id="outlined-size-small"
                            defaultValue={ date.toDateString() }
                            size="small"
                        />
                        <Button variant='contained' type='submit' sx={ { backgroundColor: ' #27c8bc ' } }>Book Now</Button>
                    </form>
                </Box>
            </Fade>
        </Modal >
    );
};

export default BookingModal;