import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAuth from '../../../Hooks/useAuth';

const DashboardAppointments = ( { date } ) => {
    const { user } = useAuth();
    const [ appointments, setAppointments ] = useState( [] );

    useEffect( () => {
        const url = `http://localhost:5001/appointments?email=${ user.email }&date=${ date }`;
        fetch( url )
            .then( res => res.json() )
            .then( data => setAppointments( data ) )
    }, [ date, user.email ] )

    return (
        <div>
            <h2>Total Appointments: { appointments.length }</h2>
            <TableContainer component={ Paper }>
                <Table sx={ {} } aria-label="Appointments Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient Name</TableCell>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Treatment</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { appointments.map( ( row ) => (
                            <TableRow
                                key={ row._id }
                                sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
                            >
                                <TableCell component="th" scope="row">
                                    { row.patientName }
                                </TableCell>
                                <TableCell align="right">{ row.time }</TableCell>
                                <TableCell align="right">{ row.serviceName }</TableCell>
                                <TableCell align="right">{ row.fat }</TableCell>
                            </TableRow>
                        ) ) }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DashboardAppointments;