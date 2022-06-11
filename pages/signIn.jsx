import { Button, Grid, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import auth from "../firebase.init";
import useToken from "../hooks/useToken";
import styles from "../styles/Custom.module.css";
const SignIn = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const [token] = useToken(user || gUser);

  const router = useRouter();

  let signInError;

  if (loading || gLoading || updating) {
    return <Loading></Loading>;
  }

  if (error || gError || updateError) {
    signInError = (
      <p className="text-red-500">
        <small>{error?.message || gError?.message || updateError?.message}</small>
      </p>
    );
  }

  if (token) {
    router.push("/");
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    console.log("update done");
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
            <h2 className=" text-2xl font-bold">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <TextField
                  fullWidth
                  id="fullWidth"
                  label="Full Name"
                  variant="standard"
                  sx={{}}
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.name?.type === "required" && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                </label>
              </div>

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
                Sign up
              </Button>
            </form>
            <p style={{ marginTop: 10 }}>
              <small>
                Already have an account?
                <Link href={"/login"}>Please login </Link>
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

export default SignIn;
