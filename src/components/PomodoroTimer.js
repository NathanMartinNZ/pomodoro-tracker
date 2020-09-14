import React, { useEffect, useMemo } from 'react'
import { Typography, Button } from '@material-ui/core';
import updateDb from "../helpers/updateDb"
import { useRecoilState } from "recoil"
import { millisecondsAtom, timerEnabledAtom, pomodorosAtom } from "../atoms"

function PomodoroTimer() {
  const [milliseconds, setMilliseconds] = useRecoilState(millisecondsAtom)
  const [timerEnabled, setTimerEnabled] = useRecoilState(timerEnabledAtom)
  const [pomodoros, setPomodoros] = useRecoilState(pomodorosAtom)

  useEffect(() => {
    const rounded = Math.floor(milliseconds)
    if(timerEnabled && rounded > 0) {
      setTimeout(() => {
        setMilliseconds(milliseconds-0.1)
      }, 100)
    } else if(timerEnabled && !rounded) {
      console.log("countdown finished")
      // Reset timer
      setTimerEnabled(false)

      // Set pomodoros in DB
      updateDb(pomodoros+1)
      
      // Increment pomodoros by 1
      setPomodoros(pomodoros+1)
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
    setTimeout(() => setMilliseconds(5), 101)
  }

  return (
    <>
      <Typography variant="h1">{calcMinutes}:{calcSeconds}</Typography>
      {!!Math.floor(milliseconds)&& (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setTimerEnabled(!timerEnabled)}
        >
          {!timerEnabled ? "Start" : "Stop"}
        </Button>
      )}
      <Button 
        variant="contained"
        color="default"
        onClick={resetTimer}
      >
        Reset
      </Button>
    </>
  )
}

export default PomodoroTimer
