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
    const firestoreDb = db.firestore()
    firestoreDb
      .collection("pomodoros")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          // Set initial pomodoros for today
          if(doc.data()) {
            setPomodoros(doc.data().count)
            setLoading(false)
          }
        })
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