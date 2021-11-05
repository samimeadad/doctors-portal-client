import React from 'react';
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const Booking = ( { booking } ) => {
    const { name, time, space } = booking;
    return (
        <Grid item xs={ 12 } sm={ 12 } md={ 4 }>
            <Card sx={ { minWidth: 275, p: 4 } }>
                <CardContent>
                    <Typography variant="h5" component="div" sx={ { color: ' #4ac6bd ' } }>
                        <strong>{ name }</strong>
                    </Typography>
                    <Typography variant="h6" sx={ { color: ' #053431 ', my: 2 } }>
                        { time }
                    </Typography>
                    <Typography sx={ { mb: 1.5 } } color="text.secondary">
                        { space } space available
                    </Typography>
                </CardContent>
                <CardActions sx={ { display: 'flex', justifyContent: 'center' } }>
                    <Button size="small" variant="contained" sx={ { backgroundColor: ' #27c8bc ' } }>Book Appointment</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Booking;