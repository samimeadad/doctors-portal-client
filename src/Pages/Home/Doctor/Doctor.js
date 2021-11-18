import { Grid, Typography } from '@mui/material';
import React from 'react';

const Doctor = ( { doctor } ) => {
    const { name, image } = doctor;
    return (
        <Grid item xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 }>
            <img style={ { height: '200px' } } src={ `data:image/png;base64,${ image }` } alt="" />
            <Typography variant="h6">{ name }</Typography>
        </Grid>
    );
};

export default Doctor;