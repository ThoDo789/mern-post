import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layouts/Landing";
import Auth from "./components/views/Auth";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/landing" exact component={Landing} />
        <Route
          path="/login"
          exact
          render={(props) => <Auth {...props} authRoute="login" />}
        />

        <Route
          path="/register"
          exact
          render={(props) => <Auth {...props} authRoute="register" />}
        />
      </Switch>
    </Router>
  );
}

export default App;
