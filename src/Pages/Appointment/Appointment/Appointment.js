import { Box } from '@mui/material';
import React from 'react';
import AppointmentHeader from '../AppointmentHeader/AppointmentHeader';
import AvailableAppointments from '../AvailableAppointments/AvailableAppointments';

const Appointment = () => {
    const [ date, setDate ] = React.useState( new Date() );

    return (
        <Box sx={ { textAlign: 'center', my: 10 } }>
            <AppointmentHeader date={ date } setDate={ setDate }></AppointmentHeader>
            <AvailableAppointments date={ date }></AvailableAppointments>
        </Box>
    );
};

export default Appointment;