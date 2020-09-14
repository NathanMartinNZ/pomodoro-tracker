import React from 'react'
import { Box } from '@material-ui/core';
import { useRecoilState } from "recoil"
import { pomodorosAtom } from "../atoms"
import updateDb from "../helpers/updateDb"

function DailyCount() {
  const [pomodoros, setPomodoros] = useRecoilState(pomodorosAtom)

  const pomodorosArr = [...Array(pomodoros).keys()]

  const addPomodoro = () => {
    setPomodoros(pomodoros+1)
    updateDb(pomodoros+1)
  }

  const removePomodoro = () => {
    setPomodoros(pomodoros-1)
    updateDb(pomodoros-1)
  }

  return (
    <Box mt={2} display="flex" flexDirection="row" flexWrap="wrap">
      {pomodorosArr.map((pomodoro) => {return (
        <Box key={pomodoro} style={{background:'red'}} p={2} m={2}>X</Box>
      )})}
      <Box style={{background:'blue'}} p={2} m={2} display="flex" flexDirection="row" flexWrap="wrap">
        <Box onClick={addPomodoro} style={{color:'white'}} mr={2}>+</Box>
        <Box onClick={removePomodoro} style={{color:'white'}}>-</Box>
      </Box>
    </Box>
  )
}

export default DailyCount