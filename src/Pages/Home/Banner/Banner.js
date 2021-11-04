import React from 'react';
import Grid from '@mui/material/Grid';
import chair from '../../../images/chair.png';
import bg from '../../../images/bg.png';
import { Box, Button, Container, Typography } from '@mui/material';

const bannerBg = {
    background: `url(${ bg })`,
    backgroundSize: 'cover',
    backgroundBlendMode: 'darken, luminosity'
}

const verticalCenter = {
    display: 'flex',
    alignItems: 'center',
    height: 400
}

const Banner = () => {
    return (
        <Container style={ bannerBg } sx={ { flexGrow: 1, my: 10 } }>
            <Grid container spacing={ 2 }>
                <Grid item xs={ 12 } md={ 6 } sx={ { ...verticalCenter, textAlign: "left" } }>
                    <Box>
                        <Typography variant="h4">
                            Your New Smile<br />
                            Starts Here
                        </Typography>
                        <Typography variant="body1" sx={ { color: 'text.secondary', my: 4 } }>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda error reiciendis dicta nemo aliquam alias corporis odio eaque omnis illo!
                        </Typography>
                        <Button variant="contained" sx={ { backgroundColor: '#5CE7ED' } }>Get Appointment</Button>
                    </Box>
                </Grid>
                <Grid item xs={ 12 } md={ 6 } style={ verticalCenter }>
                    <img src={ chair } alt="" style={ { width: '600px' } } />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Banner;