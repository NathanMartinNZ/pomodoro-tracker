import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Reporting from "./pages/Reporting";
// Components
import Header from "./components/Header";
import { AuthProvider } from "./components/Auth/Auth";
import PrivateRoute from "./components/Auth/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/reporting" component={Reporting} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
