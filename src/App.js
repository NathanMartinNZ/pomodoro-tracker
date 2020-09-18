import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import db from "./firebase";

import "./index.css";

// Recoil (state)
import { useRecoilState } from "recoil";
import { pomodorosAtom } from "./atoms";

// Pages
import Home from "./pages/Home";
import Reporting from "./pages/Reporting";

// Components
import Header from "./components/Header";

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
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home loading={loading} />
          </Route>
          <Route path="/reporting">
            <Reporting />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
