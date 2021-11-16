import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Box, Button, CircularProgress } from '@mui/material';
import useAuth from '../../../Hooks/useAuth';

const CheckOutForm = ( { appointment } ) => {
    const { price, patientName, _id } = appointment;
    const stripe = useStripe();
    const elements = useElements();
    const [ error, setError ] = useState( '' );
    const [ success, setSuccess ] = useState( '' );
    const [ processing, setProcessing ] = useState( false );
    const [ clientSecret, setClientSecret ] = useState( '' );
    const { user } = useAuth();

    useEffect( () => {
        fetch( 'http://localhost:5002/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify( { price } )
        } )
            .then( res => res.json() )
            .then( data => setClientSecret( data.clientSecret ) )
    }, [ price ] );

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        if ( !stripe || !elements ) {
            return;
        }

        const card = elements.getElement( CardElement );
        if ( card === null ) {
            return;
        }

        setProcessing( true );

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod( {
            type: 'card',
            card
        } )

        if ( error ) {
            setSuccess( '' );
            setError( error.message );
        }
        else {
            setError( '' );
            console.log( paymentMethod );
        }

        //payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: user.email
                    },
                },
            },
        );

        if ( intentError ) {
            setSuccess( '' );
            setError( intentError.message );
        }
        else {
            setError( '' );
            setSuccess( 'Your payment processed successfully' );
            console.log( paymentIntent );
            setProcessing( false );

            //save payment intent information to database
            const payment = {
                amount: paymentIntent.amount,
                transaction: paymentIntent.client_secret.slice( '_secret' )[ 0 ],
                created: paymentIntent.created,
                // last4: paymentIntent.payment_method.card.last4
            }
            const url = `https://salty-reef-03503.herokuapp.com/appointments/${ _id }`
            fetch( url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify( payment )
            } )
                .then( res => res.json() )
                .then( data => console.log( data ) );
        }
    }

    return (
        <Box sx={ { width: .5, mt: 8 } }>
            <hr />
            <form onSubmit={ handleSubmit }>
                <CardElement
                    options={ {
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    } }
                />
                { processing ? <CircularProgress></CircularProgress> : <Button sx={ { mt: 4 } } variant="contained" type="submit" disabled={ !stripe || success }>
                    Pay ${ price }
                </Button> }
            </form>
            {
                error && <p style={ { color: 'red' } }>{ error }</p>
            }
            {
                success && <p style={ { color: 'green' } }>{ success }</p>
            }
        </Box>
    );
};

export default CheckOutForm;