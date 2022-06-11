import { Button, Grid, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import auth from "../firebase.init";
import styles from "../styles/Custom.module.css";
const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  let signInError;
  const router = useRouter();

  if (loading || gLoading) {
    return <Loading></Loading>;
  }

  if (error || gError) {
    signInError = (
      <p className="text-red-500">
        <small>{error?.message || gError?.message}</small>
      </p>
    );
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
    router.push("/");
  };

  return (
    <Grid container spacing={4} className={styles.design} sx={{ mt: 0.2 }}>
      <Grid item xs={12} md={7}>
        <img className="img-fluid" src="2.png" alt="" />
      </Grid>
      <Grid item xs={12} md={5} sx={{ height: "865px" }}>
        <div className="m-lg-5">
          <div>
            <h2 className=" text-2xl font-bold">Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <TextField
                  fullWidth
                  sx={{}}
                  id="fullWidth"
                  label="Email Address"
                  variant="standard"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is Required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide a valid Email",
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                  {errors.email?.type === "pattern" && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                </label>
              </div>
              <div>
                <TextField
                  fullWidth
                  sx={{}}
                  id="fullWidth"
                  label="Password"
                  variant="standard"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is Required",
                    },
                    minLength: {
                      value: 6,
                      message: "Must be 6 characters or longer",
                    },
                  })}
                />
                <label className="label">
                  {errors.password?.type === "required" && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                  {errors.password?.type === "minLength" && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                </label>
              </div>

              {signInError}
              <Button variant="contained" color="primary" fullWidth type="submit" value="Sign Up" sx={{ marginTop: 10 }}>
                Sign In
              </Button>
            </form>
            <p style={{ marginTop: 10 }}>
              <small>
                Are you a new user?
                <Link href={"/signIn"}>Please sign up </Link>
              </small>
            </p>
            <div className="divider">OR</div>
            <Button variant="contained" color="primary" onClick={() => signInWithGoogle()} fullWidth sx={{ marginTop: 4 }}>
              Continue with Google
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
