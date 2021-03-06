import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Profile } from "./pages/profile/Profile";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./app.css"
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";
import { Register } from "./pages/register/Register";
import { Messenger } from "./pages/messenger/Messenger";
import Search from "./pages/search/Search";
import { PostWatch } from "./pages/postWatch/PostWatch";
import { PostDetail } from "./pages/postDetail/postDetail";
import { Webcam } from "./components/webcam/Webcam";

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
            {user ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route path="/messenger">
            {user ? <Messenger /> : <Redirect to="/login" />}
          </Route>
          <Route path="/search">
            {user ? <Search /> : <Redirect to="/login" />}
          </Route>

          <Route path="/post/:id">
            {user ? <PostDetail /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
