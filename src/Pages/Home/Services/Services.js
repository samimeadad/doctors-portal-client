import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import Service from '../Service/Service';
import fluoride from '../../../images/fluoride.png';
import cavity from '../../../images/cavity.png';
import whitening from '../../../images/whitening.png';


const services = [
    {
        name: "Flouride Treatement",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptates soluta commodi magnam at expedita tempora sunt dolorem quasi repellat sed!",
        img: fluoride
    },
    {
        name: "Cavity Filling",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptates soluta commodi magnam at expedita tempora sunt dolorem quasi repellat sed!",
        img: cavity
    },
    {
        name: "Teeth Whitening",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptates soluta commodi magnam at expedita tempora sunt dolorem quasi repellat sed!",
        img: whitening
    }
];

const Services = () => {
    return (
        <Box sx={ { flexGrow: 1, mt: 10 } }>
            <Container>
                <Typography variant="h6" component="div" sx={ { mb: 4, color: ' #76d7c4 ', fontWeight: 700 } }>
                    OUR SERVICES
                </Typography>
                <Typography variant="h4" component="div" sx={ { mb: 4, fontWeight: 'bold' } }>
                    Services We Provide
                </Typography>
                <Grid container spacing={ { xs: 2, md: 3 } } columns={ { xs: 4, sm: 8, md: 12 } }>
                    {
                        services.map( service => <Service
                            key={ service.name }
                            service={ service }
                        ></Service> )
                    }
                </Grid>
            </Container>
        </Box>
    );
};

export default Services;