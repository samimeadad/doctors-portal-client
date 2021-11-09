import { Grid } from '@mui/material';
import * as React from 'react';
import Calendar from '../../Shared/Calendar/Calendar';
import DashboardAppointments from '../DashBoardAppointments/DashboardAppointments';

const DashboardHome = () => {
    const [ date, setDate ] = React.useState( new Date() );

    return (
        <Grid container spacing={ 2 }>
            <Grid item xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 }>
                <Calendar
                    date={ date }
                    setDate={ setDate }
                ></Calendar>
            </Grid>
            <Grid item xs={ 12 } sm={ 12 } md={ 8 } lg={ 8 }>
                <DashboardAppointments date={ date }></DashboardAppointments>
            </Grid>
        </Grid>
    );
};

export default DashboardHome;