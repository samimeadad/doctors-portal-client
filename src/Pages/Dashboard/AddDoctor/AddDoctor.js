import React, { useState } from 'react';
import { Box, Button, Input, TextField } from '@mui/material';

const AddDoctor = () => {
    const [ name, setName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ image, setImage ] = useState( null );
    const [ success, setSuccess ] = useState( false );

    const handleSubmit = e => {
        e.preventDefault();
        if ( !image ) {
            return;
        }
        const formData = new FormData();
        formData.append( 'name', name );
        formData.append( 'email', email );
        formData.append( 'image', image );

        fetch( 'https://salty-reef-03503.herokuapp.com/doctors', {
            method: 'POST',
            body: formData
        } )
            .then( res => res.json() )
            .then( data => {
                if ( data.insertedId ) {
                    setSuccess( "Doctors Added Successfully" );
                    setName( '' );
                    setEmail( '' );
                    setImage( null );
                }
            } )
            .catch( error => {
                console.error( 'Error:', error );
            } );
    }

    return (
        <Box>
            <h2>Add a Doctor</h2>
            <form onSubmit={ handleSubmit }>
                <TextField
                    sx={ { width: "50%", mb: 4 } }
                    required
                    label="Name"
                    variant="standard"
                    onChange={ e => setName( e.target.value ) }
                />
                <br></br>
                <TextField
                    sx={ { width: "50%", mb: 4 } }
                    type="email"
                    required
                    label="Email"
                    variant="standard"
                    onChange={ e => setEmail( e.target.value ) }

                />
                <br />
                <Input
                    accept="image/*"
                    type="file"
                    onChange={ e => setImage( e.target.files[ 0 ] ) }
                />
                <br />
                <Button variant="contained" type="submit">
                    Add Doctor
                </Button>
            </form>
            { success && <p>{ success }</p> }
        </Box>
    );
};

export default AddDoctor;