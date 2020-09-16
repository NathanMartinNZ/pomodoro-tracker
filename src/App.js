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
    const today = new Date(Date.now() - ( 3600 * 1000 * 24))
    const firestoreDb = db.firestore()
    firestoreDb
      .collection("pomodoros")
      .where("date", ">=", today)
      .get()
      .then((querySnapshot) => {
        let foundDoc = false
        querySnapshot.forEach((doc) => {
          foundDoc = true
          console.log(doc.data())
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
          <Grid item xs={12} md={6}>
            <Paper>
              <Container maxWidth="md">
                <PomodoroTimer />
                <DailyCount />
              </Container>
            </Paper>
          </Grid>
        </Box>
      )}
    </div>
  )
}

export default App