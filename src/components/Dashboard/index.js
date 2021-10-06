import { Redirect, useHistory } from "react-router";
import { Button, TextField, FormControl } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "../Card";
import api from "../../services/api";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Dashboard = ({ authenticated, setAuthenticated }) => {
  const [techs, setTechs] = useState([]);

  const userId = localStorage.getItem("@KHub:userId");

  const userName = localStorage.getItem("@KHub:userName");

  const [token] = useState(
    JSON.parse(localStorage.getItem("@KHub:token")) || ""
  );

  function loadTechs() {
    api
      .get(`/users/${userId}`)
      .then((response) => {
        setTechs(response.data.techs);
        console.log(response.data.techs);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onSubmit(data) {
    api
      .post("/users/techs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(toast.success("Tech added!"))
      .catch((err) => {
        toast.error("Tech already exists!");
        console.log(err);
      });
  }

  const formSchema = yup.object().shape({
    title: yup.string().required("Title required"),
    status: yup.string().required("Status required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          setAuthenticated(false);
          localStorage.clear();
        }}
      >
        Log Out
      </Button>
      <h2>Welcome, {userName} </h2>
      <Button onClick={() => loadTechs} color="primary" variant="contained">
        Show Techs
      </Button>

      {techs.map((e) => (
        <Card tech={e} />
      ))}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <TextField
            error={errors.title?.message}
            helperText={errors.title?.message}
            {...register("title")}
            label="Tech name"
          ></TextField>
          <TextField
            error={errors.status?.message}
            helperText={errors.status?.message}
            {...register("status")}
            label="Your level"
          ></TextField>
          <Button color="primary" variant="contained" type="submit">
            Add Tech
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default Dashboard;
