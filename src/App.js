import React, { useState, useEffect } from "react"

import db from "./firebase";

import "./index.css"
import { Container, Box, Grid, Paper } from "@material-ui/core"

import { useRecoilState } from "recoil"
import { pomodorosAtom } from "./atoms"

import Header from "./components/Header"
import PomodoroTimer from "./components/PomodoroTimer"
import DailyCount from "./components/DailyCount"

function App() {
  const [_, setPomodoros] = useRecoilState(pomodorosAtom)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const today = new Date().toDateString()
    const firestoreDb = db.firestore()
    firestoreDb
      .collection("pomodoros")
      .where("date", ">=", today)
      .get()
      .then((querySnapshot) => {
        let foundDoc = false
        querySnapshot.forEach((doc) => {
          foundDoc = true
          // Set initial pomodoros for today
          if(doc.data()) {
            setPomodoros(doc.data().count)
            setLoading(false)
          }
        })
        if(!foundDoc) {
          firestoreDb
            .collection("pomodoros")
            .add({ date: new Date(), count: 0 })
        }
      })
  }, [])

  return (
    <div className="App">
      <Header />
      {!loading && (
        <Box mt={6}>
          <Grid container justify="center">
            <Grid item xs={12} md={4}>
                <Paper>
                  <Container>
                    <Box pt={2} pb={2}>
                      <PomodoroTimer />
                      <DailyCount />
                    </Box>
                  </Container>
                </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  )
}

export default App