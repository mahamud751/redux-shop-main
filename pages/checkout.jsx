import React, { useState } from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';
import swal from 'sweetalert';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Checkout = () => {
    const initialInfo = { patientName: '', email: '', phone: '' }
    const getState = useSelector((state) => state.cartReducer.cart);


    const [bookingInfo, setBookingInfo] = useState(initialInfo)

    const handleOnBlur = e => {
        const field = e.target.name
        const value = e.target.value
        const newValue = { ...bookingInfo }

        newValue[field] = value
        setBookingInfo(newValue)
    }

    // Handle Product submit
    const handleModal = e => {
        const appointment = {
            ...bookingInfo,
            getState
        }
        console.log(appointment)
        fetch('https://guarded-garden-69209.herokuapp.com/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(appointment)
        })
            .then(res => res.json())
            .then(data => {
                alert('done')

            })

        alert('Success')
        e.preventDefault()
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <form onSubmit={handleModal}>


                        <TextField
                            id="outlined-size-small"
                            sx={{ width: "90%", m: 1 }}
                            name="patientName"
                            onBlur={handleOnBlur}
                            defaultValue={'name'}
                            size="small"
                        />
                        <TextField
                            id="outlined-size-small"
                            sx={{ width: "90%", m: 1 }}
                            name="email"
                            onBlur={handleOnBlur}
                            defaultValue={'email'}
                            size="small"
                        />
                        <TextField
                            id="outlined-size-small"
                            sx={{ width: "90%", m: 1 }}
                            name="phone"
                            onBlur={handleOnBlur}
                            defaultValue=" "
                            size="small"
                        />

                        <Button type="submit" variant="contained">BOOKING APPOINTMENT</Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Checkout;