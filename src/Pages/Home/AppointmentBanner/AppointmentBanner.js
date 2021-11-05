import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import doctor from '../../../images/doctor.png';
import bg from '../../../images/appointment-bg.png';
import { Button, Typography } from '@mui/material';

const appointmentBanner = {
    background: `url(${ bg })`,
    marginTop: '175px',
    marginBottom: '200px',
    backgroundColor: ' rgba(71, 80, 118, 0.75) ',
    backgroundBlendMode: 'darken, luminosity'
}

const AppointmentBanner = () => {
    return (
        <Box style={ appointmentBanner } sx={ { flexGrow: 1, mt: 8 } }>
            <Grid container spacing={ 2 }>
                <Grid item xs={ 12 } md={ 6 }>
                    <img style={ { width: '500px', height: '600px', marginTop: '-160px' } } src={ doctor } alt="" />
                </Grid>
                <Grid item xs={ 12 } md={ 6 } sx={ { display: 'flex', justifyContent: 'flex-start', alignItems: 'center' } }>
                    <Box sx={ { textAlign: 'left', py: 6 } }>
                        <Typography variant="h6" sx={ { color: '#65ece2', mb: 4 } }>
                            Appointment
                        </Typography>
                        <Typography variant="h4" sx={ { color: 'white', mb: 4 } }>
                            Make an Appointment Today
                        </Typography>
                        <Typography variant="h6" sx={ { color: 'white', mb: 4, fontWeight: 100, fontSize: '14px' } }>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        </Typography>
                        <Button variant="contained" sx={ { backgroundColor: '#5CE7ED' } }>Learn More</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    );
};

export default AppointmentBanner;