import { useParams } from "react-router";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function Card({ user }) {
  const history = useHistory();
  const params = useParams();

  return (
    <div>
      <h2>You are our user number {params.id} </h2>
      <h4>Name: {user.name} </h4>
      <h4>Email: {user.email} </h4>
      <Button
        color="primary"
        variant="contained"
        onClick={() => history.push("/")}
      >
        Home
      </Button>
    </div>
  );
}
