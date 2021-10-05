import Router from "./Router";
import "./App.css";
import api from "./services/api";

function App() {
  const users = api.get("/users");
  console.log(users);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
