import { Container } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';

const Payment = () => {
    const { appointmentId } = useParams();
    const [ appointment, setAppointment ] = useState( {} );

    useEffect( () => {
        fetch( `https://salty-reef-03503.herokuapp.com/appointments/${ appointmentId }` )
            .then( res => res.json() )
            .then( data => setAppointment( data ) );

    }, [ appointmentId ] );

    const stripePromise = loadStripe( 'pk_test_51JwKiVC8fBGP6Btsa35y5scheBDtepGj6bvPEp3J5LdGbFYPPcI0gCOrN5sSNkvdb3geLZkD0N3Bh8FDyABw0iWB00rJCGOFHU' );


    return (
        <Container>
            <h1>Payment for { appointment.serviceName }</h1>
            <h2>Date: { appointment.date }</h2>
            <h3>Time: { appointment.time }</h3>
            <h4>Patient Name: { appointment.patientName }</h4>
            <h4>Please pay ${ appointment.price }</h4>
            { appointment.price && <Elements stripe={ stripePromise }>
                <CheckOutForm
                    appointment={ appointment }
                />
            </Elements> }
        </Container>
    );
};

export default Payment;

/*
Steps to complete:
1. Create a new stripe account
2. Install stripe and stripe-react
3. Set publishable key in the project
4. Set Elements
5. Create checkout form
6. Create a payment method
7. Server side: create payment intent API
8. Load client secret
9. Confirm card payment
10. Handle user error
*/