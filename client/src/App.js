import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layouts/Landing";
import Auth from "./components/views/Auth";
import AuthContextProvider from "./components/contexts/AuthContext";
import DashBoard from "./components/views/DashBoard";
function App() {
  return (
    <AuthContextProvider>
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
              <Route path="/dashboard" exact component={DashBoard} />
            </Switch>
          </Router>
    </AuthContextProvider>
  );
}

export default App;
