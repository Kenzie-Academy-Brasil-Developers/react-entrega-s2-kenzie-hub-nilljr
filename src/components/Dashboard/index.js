import { Redirect } from "react-router";
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

  const loadTechs = () => {
    api
      .get(`/users/${userId}`)
      .then((response) => {
        setTechs(response.data.techs);
        console.log(response.data.techs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTech = (id) => {
    console.log(id);
    api
      .delete(`/users/techs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(loadTechs);
  };

  function onSubmit(data) {
    api
      .post("/users/techs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        localStorage.setItem(`${response.data.title}:id`, response.data.id);
        loadTechs();
      })
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
    <div className="dashboard">
      <Button
        className="logOut"
        color="terciary"
        variant="contained"
        onClick={() => {
          setAuthenticated(false);
          localStorage.clear();
        }}
      >
        Log Out
      </Button>
      <h2>Welcome, {userName} </h2>

      <Button
        id="showButton"
        onClick={loadTechs}
        variant="contained"
        color="primary"
      >
        Show techs
      </Button>
      <div className="cards">
        {techs.map((e) => (
          <Card tech={e} deleteTech={deleteTech} />
        ))}
      </div>

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
