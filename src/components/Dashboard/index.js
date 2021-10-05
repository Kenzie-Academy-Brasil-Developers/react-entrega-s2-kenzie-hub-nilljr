import { useHistory } from "react-router";
import { Button } from "@material-ui/core";

const Dashboard = ({ user }) => {
  const history = useHistory();
  return (
    <div>
      <h2>Seja bem vindo, {user.name}!</h2>
      <Button
        color="primary"
        variant="contained"
        onClick={() => history.push("/")}
      >
        Home
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={() => history.push(`/loggedin/1`)}
      >
        My info
      </Button>
    </div>
  );
};

export default Dashboard;
