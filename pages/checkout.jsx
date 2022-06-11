import { Box, Button, Container, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import auth from "../firebase.init";

const RedditTextField = styled((props) => <TextField InputProps={{ disableUnderline: true }} {...props} />)(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Checkout = () => {
  const [user] = useAuthState(auth);
  const initialInfo = { patientName: "", email: "", phone: "", address: "" };
  const getState = useSelector((state) => state.cartReducer.cart);

  const [bookingInfo, setBookingInfo] = useState(initialInfo);

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newValue = { ...bookingInfo };

    newValue[field] = value;
    setBookingInfo(newValue);
  };

  // Handle Product submit
  const handleModal = (e) => {
    const appointment = {
      ...bookingInfo,
      getState,
    };
    console.log(appointment);
    fetch("https://guarded-garden-69209.herokuapp.com/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(appointment),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("done");
      });

    alert("Success");
    e.preventDefault();
  };
  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography variant="h3" color="initial">
        Billing address
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={12}>
          <form onSubmit={handleModal}>
            <InputLabel shrink htmlFor="bootstrap-input">
              Name
            </InputLabel>

            <RedditTextField id="outlined-basic" sx={{ width: "90%", m: 1 }} name="patientName" onBlur={handleOnBlur} defaultValue={""} variant="filled" />

            <InputLabel shrink htmlFor="bootstrap-input">
              Email
            </InputLabel>
            <RedditTextField
              id="outlined-size-small"
              sx={{ width: "90%", m: 1 }}
              name="email"
              onBlur={handleOnBlur}
              defaultValue={""}
              size="small"
              variant="filled"
            />
            <InputLabel shrink htmlFor="bootstrap-input">
              Phone Number
            </InputLabel>
            <RedditTextField
              id="outlined-size-small"
              sx={{ width: "90%", m: 1 }}
              name="phone"
              onBlur={handleOnBlur}
              defaultValue=" "
              size="small"
              variant="filled"
            />
            <InputLabel shrink htmlFor="bootstrap-input">
              Address
            </InputLabel>
            <RedditTextField
              id="reddit-input"
              variant="filled"
              sx={{ width: "90%", m: 1 }}
              name="address"
              onBlur={handleOnBlur}
              defaultValue=" "
              size="small"
            />

            <Box>
              <Button type="submit" variant="contained" sx={{ width: "90%", m: 1 }}>
                Continue to checkout
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
