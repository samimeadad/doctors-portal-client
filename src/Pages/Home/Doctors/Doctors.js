import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Doctor from '../Doctor/Doctor';

const Doctors = () => {
    const [ doctors, setDoctors ] = useState( [] );

    useEffect( () => {
        fetch( 'https://salty-reef-03503.herokuapp.com/doctors' )
            .then( res => res.json() )
            .then( data => setDoctors( data ) );
    }, [] );

    console.log( doctors );

    return (
        <Box sx={ { my: 8 } }>
            <Typography variant="h4" sx={ { fontWeight: 'bold', mb: 4 } }>Our Doctors: { doctors.length }</Typography>
            <Container>
                <Grid container spacing={ 2 }>
                    {
                        doctors.map( doctor => <Doctor key={ doctor._id } doctor={ doctor } /> )
                    }
                </Grid>
            </Container>
        </Box>
    );
};

export default Doctors;