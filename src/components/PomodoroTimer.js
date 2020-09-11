import React, { useEffect, useMemo } from 'react'
import { Box, Grid, Paper, Typography, Button } from '@material-ui/core';

import { useRecoilState } from "recoil"
import { millisecondsAtom, timerEnabledAtom } from "../atoms"

function PomodoroTimer() {
  const [milliseconds, setMilliseconds] = useRecoilState(millisecondsAtom)
  const [timerEnabled, setTimerEnabled] = useRecoilState(timerEnabledAtom)

  useEffect(() => {
    const rounded = Math.floor(milliseconds)
    if(timerEnabled && Math.floor(milliseconds) > 0) {
      setTimeout(() => {
        setMilliseconds(milliseconds-0.1)
      }, 100)
    } else if(timerEnabled && !rounded) {
      console.log("countdown finished")
      setTimerEnabled(false)
    }
  })

  const calcMinutes = useMemo(() => {
    return Math.floor((milliseconds/60) << 0)
  }, [milliseconds])

  const calcSeconds = useMemo(() => {
    const num = Math.floor(milliseconds % 60)
    return ("0" + num).slice(-2)
  }, [milliseconds])

  const resetTimer = () => {
    setTimerEnabled(false)
    setTimeout(() => setMilliseconds(1500), 101)
  }

  return (
    <Box mt={2}>
      <Grid item xs={12}>
        <Paper>
          <Typography variant="h1">{calcMinutes}:{calcSeconds}</Typography>
          <Button 
            variant="contained"
            color="primary"
            onClick={() => setTimerEnabled(!timerEnabled)}
          >
            {!timerEnabled ? "Start" : "Stop"}
          </Button>
          <Button 
            variant="contained"
            color="default"
            onClick={resetTimer}
          >
            Reset
          </Button>
        </Paper>
      </Grid>
    </Box>
  )
}

export default PomodoroTimer
