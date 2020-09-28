import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import db from "./firebase";
import "./index.css";
// Recoil (state)
import { useRecoilState } from "recoil";
import { pomodorosAtom } from "./atoms";
// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Reporting from "./pages/Reporting";
// Components
import Header from "./components/Header";
import { AuthProvider } from "./components/Auth/Auth";
import PrivateRoute from "./components/Auth/PrivateRoute";

function App() {
  const [_, setPomodoros] = useRecoilState(pomodorosAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toDateString();
    const firestoreDb = db.firestore();
    firestoreDb
      .collection("pomodoros")
      .where("date", "==", today)
      .get()
      .then((querySnapshot) => {
        let foundDoc = false;
        querySnapshot.forEach((doc) => {
          foundDoc = true;
          // Set initial pomodoros for today
          if (doc.data()) {
            setPomodoros(doc.data().count);
            setLoading(false);
          }
        });
        if (!foundDoc) {
          firestoreDb.collection("pomodoros").add({ date: new Date().toDateString(), count: 0 });

          setPomodoros(0);
          setLoading(false);
        }
      });
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <PrivateRoute exact path="/" component={Home} loading={loading} />
            <PrivateRoute exact path="/reporting" component={Reporting} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
