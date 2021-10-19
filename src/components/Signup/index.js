import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid, Paper, TextField, FormControl, Button } from "@material-ui/core";
import { useHistory, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "50vh",
    marginTop: "10vw",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "lightgray",
  },
}));

const Signup = ({ authenticated, setAuthenticated }) => {
  const classes = useStyles();

  const history = useHistory();

  const formSchema = yup.object().shape({
    name: yup.string().required("Tell us your name"),
    email: yup.string().required("We need your e-mail").email("Invalid email"),
    password: yup
      .string()
      .required("Password required")
      .min(5, "Password must contain 6 or more characters"),
    confirmation: yup
      .string()
      .required("Confirmation of password required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    bio: yup.string().required("Say something about you"),
    contact: yup.string("Some way of contacting you"),
    course_module: yup.string("Wich module are you?"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    api
      .post("/users", data)
      .then((_) => {
        toast.success("Account successfully created!");
        return history.push("/login");
      })
      .catch((err) => toast.error("Email already in use!"));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div id="signup" className={classes.root}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={6} className={classes.item}>
          <Paper className={classes.paper}>
            <h2>Create your account</h2>
            <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
              <FormControl>
                <TextField
                  error={errors.name?.message}
                  helperText={errors.name?.message}
                  label="Name"
                  {...register("name")}
                ></TextField>
                <TextField
                  error={errors.email?.message}
                  helperText={errors.email?.message}
                  label="Email"
                  {...register("email")}
                ></TextField>
                <TextField
                  error={errors.password?.message}
                  helperText={errors.password?.message}
                  type="password"
                  label="Password"
                  {...register("password")}
                ></TextField>
                <TextField
                  error={errors.confirmation?.message}
                  helperText={errors.confirmation?.message}
                  type="password"
                  label="Confirm your password"
                  {...register("confirmation")}
                ></TextField>
                <TextField label="About you" {...register("bio")}></TextField>
                <TextField label="Contact" {...register("contact")}></TextField>
                <TextField
                  label="Course Module"
                  {...register("course_module")}
                ></TextField>
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
                <span>
                  Already have an account? <Link to="/login">Log in</Link>
                </span>
              </FormControl>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
