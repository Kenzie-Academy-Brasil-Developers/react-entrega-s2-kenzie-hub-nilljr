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
    email: yup.string().required("Email required").email("Invalid email"),
    password: yup.string().required("Password required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = ({ email, password }) => {
    const user = { email, password };
    api.post("/users", user);
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={6} className={classes.item}>
          <Paper className={classes.paper}>
            <h2>Log in to your account</h2>
            <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
              <FormControl>
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
                <Button color="primary" variant="contained" type="submit">
                  Enter
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
