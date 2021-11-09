import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const MakeAdmin = () => {
    const [ adminEmail, setAdminEmail ] = useState( '' );
    const [ success, setSuccess ] = useState( false );
    const { token } = useAuth();

    const handleOnBlur = e => {
        setAdminEmail( e.target.value );
    }

    const handleAdminSubmit = e => {
        e.preventDefault();
        const user = { adminEmail };
        fetch( 'https://salty-reef-03503.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${ token }`,
                'content-type': 'application/json'
            },
            body: JSON.stringify( user )
        } )
            .then( res => res.json() )
            .then( data => {
                if ( data.modifiedCount ) {
                    setSuccess( true );
                    console.log( data )
                }
            } )
    }

    return (
        <div style={ { textAlign: 'left' } }>
            <h2>Make Admin</h2>
            <form onSubmit={ handleAdminSubmit }>
                <TextField
                    sx={ { width: '50%', marginRight: '25px' } }
                    label="Your Email"
                    variant="standard"
                    type="email"
                    onBlur={ handleOnBlur }
                />
                <Button sx={ { marginTop: '10px' } } variant="contained" color="primary" type="submit">
                    Make Admin
                </Button>
            </form>
            { success && <Alert severity="success">User status changed to Admin Successfully!</Alert> }
        </div >
    );
};

export default MakeAdmin;