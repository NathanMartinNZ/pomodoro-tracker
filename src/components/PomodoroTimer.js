import React, { useState, useEffect } from "react"
import { Typography, Button, Box } from '@material-ui/core';
import updateDb from "../helpers/updateDb"
import { useRecoilState } from "recoil"
import { pomodorosAtom } from "../atoms"

const RESET_INTERVAL_S = 5;

const PomodoroTimer = () => {
  // Component state
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(true)
  // Recoil state
  const [pomodoros, setPomodoros] = useRecoilState(pomodorosAtom)

  useEffect(() => {
    if(!paused) {
      const timerId = setInterval(() => {
        setTime((t) => {
          if(t < RESET_INTERVAL_S-1) {
            return t + 1
          } else {
            // Pause timer
            setPaused(true)

            // Set pomodoros in DB
            updateDb(pomodoros+1)
            
            // Increment pomodoros by 1
            setPomodoros(pomodoros+1)
            
            return t + 1
          }
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [paused]);

  return <Timer time={time} setTime={setTime} paused={paused} setPaused={setPaused} />;
};

const formatTime = (time) => {
  return `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`
}

const Timer = ({ time, setTime, paused, setPaused }) => {
  const timeRemain = RESET_INTERVAL_S - time;

  const resetTimer = () => {
    setTime(0)
    setPaused(true)
  }

  return (
    <>
      <Box>
        <Typography variant="h1">{formatTime(timeRemain)}</Typography>
        {!!timeRemain && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPaused(!paused)}
          >
            {paused ? 'Start' : 'Stop'}
          </Button>
        )}
        <Button 
          variant="contained"
          color="default"
          onClick={resetTimer}
        >
          Reset
        </Button>
      </Box>
    </>
  );
};

export default PomodoroTimer