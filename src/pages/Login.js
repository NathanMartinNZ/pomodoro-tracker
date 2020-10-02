import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase, { firebaseAuth } from "../firebase.js";
import { AuthContext } from "../components/Auth/Auth";

const Login = ({ history }) => {
  // DEMO: U: demo@demo.com  P: demo123

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        // TODO: Fix persistence (not currently being added to local storage)
        await firebase.auth().setPersistence(firebaseAuth.Auth.Persistence.LOCAL);
        await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
