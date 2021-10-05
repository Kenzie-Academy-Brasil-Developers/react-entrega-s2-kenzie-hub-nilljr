import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid, Paper, TextField, FormControl, Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";

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
  },
}));

const Signup = ({ user, setUser }) => {
  const classes = useStyles();

  const history = useHistory();

  const formSchema = yup.object().shape({
    name: yup.string().required("Name required"),
    email: yup.string().required("Email required").email("Invalid email"),
    password: yup.string().required("Password required"),
    confirmation: yup
      .string()
      .required("Confirmation of password required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    bio: yup.string().required("Password required"),
    contact: yup.string().required("Password required"),
    course_module: yup.string().required("Password required"),
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
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
    console.log(data);
    history.push("/login");
  };

  return (
    <div className={classes.root}>
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
                  label="Password confirmation"
                  {...register("confirmation")}
                ></TextField>
                <TextField
                  error={errors.confirmation?.message}
                  helperText={errors.confirmation?.message}
                  label="Bio"
                  {...register("bio")}
                ></TextField>
                <TextField
                  error={errors.confirmation?.message}
                  helperText={errors.confirmation?.message}
                  label="Contact"
                  {...register("contact")}
                ></TextField>
                <TextField
                  error={errors.confirmation?.message}
                  helperText={errors.confirmation?.message}
                  label="Course Module"
                  {...register("course_module")}
                ></TextField>
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
              </FormControl>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
