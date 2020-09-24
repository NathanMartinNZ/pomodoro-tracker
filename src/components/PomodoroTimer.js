import React, { useState, useEffect } from "react";
import { Typography, Button, Box, TextField } from "@material-ui/core";
import updateDb from "../utils/updateDb";
import { useRecoilState } from "recoil";
import { pomodorosAtom, startTimeAtom } from "../atoms";
import alarmFile from "../alarm-audio.mp3";

const alarm = new Audio(alarmFile);

const PomodoroTimer = () => {
  // Component state
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(true);
  // Recoil state
  const [pomodoros, setPomodoros] = useRecoilState(pomodorosAtom);
  const [startTime] = useRecoilState(startTimeAtom);

  useEffect(() => {
    if (!paused) {
      const timerId = setInterval(() => {
        setTime((t) => {
          if (t < startTime - 1) {
            return t + 1;
          } else {
            // Pause timer
            setPaused(true);
            // Play alarm audio
            alarm.play();
            // Set pomodoros in DB
            updateDb(pomodoros + 1);
            // Increment pomodoros by 1
            setPomodoros(pomodoros + 1);

            return t + 1;
          }
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [paused]);

  return <Timer time={time} setTime={setTime} paused={paused} setPaused={setPaused} />;
};

const formatTime = (time) => {
  return `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`;
};

const Timer = ({ time, setTime, paused, setPaused }) => {
  const [selected, setSelected] = useState(false);
  const [startTime, setStartTime] = useRecoilState(startTimeAtom);
  const timeRemain = startTime - time;

  const resetTimer = () => {
    setTime(0);
    setPaused(true);
    // Reset timer
    alarm.pause();
    alarm.currentTime = 0;
  };

  const toggleSelectTime = () => {
    setSelected(!selected);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSelected(!selected);
    }
  };

  const handleTimeChange = (newTime) => {
    const time = newTime.split(":");
    const seconds = Number(time[0]) * 60 + Number(time[1]);
    setStartTime(seconds);
  };

  return (
    <>
      <Box className="timer" style={{ textAlign: "center" }}>
        {/* Timer value */}
        {!selected && (
          <Typography variant="h1" onClick={toggleSelectTime}>
            {formatTime(timeRemain)}
          </Typography>
        )}
        {selected && (
          <h1 className="MuiTypography-root MuiTypography-h1 timer-input">
            <TextField
              autoFocus
              onChange={(e) => handleTimeChange(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
              onBlur={toggleSelectTime}
              value={formatTime(timeRemain)}
            />
          </h1>
        )}

        {/* Buttons */}
        {!!timeRemain && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPaused(!paused)}
            style={{ marginRight: 6 }}
          >
            {paused ? "Start" : "Stop"}
          </Button>
        )}
        <Button variant="contained" color="default" onClick={resetTimer}>
          Reset
        </Button>
      </Box>
    </>
  );
};

export default PomodoroTimer;
