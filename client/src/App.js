import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Profile } from "./pages/profile/Profile";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./app.css"
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";
import { Register } from "./pages/register/Register";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
