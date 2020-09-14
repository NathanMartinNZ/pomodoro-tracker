import React from 'react'
import { Box } from '@material-ui/core';
import { useRecoilState } from "recoil"
import { pomodorosAtom } from "../atoms"
import updateDb from "../helpers/updateDb"

function DailyCount() {
  const [pomodoros, setPomodoros] = useRecoilState(pomodorosAtom)

  const pomodorosArr = [...Array(pomodoros).keys()]

  const addPomodoro = () => {
    updateDb(pomodoros+1)
    setPomodoros(pomodoros+1)
  }

  const removePomodoro = () => {
    updateDb(pomodoros-1)
    setPomodoros(pomodoros-1)
  }

  return (
    <Box mt={2} display="flex" flexDirection="row" flexWrap="wrap">
      {pomodorosArr.map((pomodoro) => {return (
        <Box key={pomodoro} style={{background:'#f2f2f2', cursor:'default', borderRadius:10}} p={3} m={1}>✔</Box>
      )})}
      <Box style={{background:'#3f51b5', cursor:'default', borderRadius:10, fontWeight:'bold'}} p={3} m={1} display="flex" flexDirection="row" flexWrap="wrap">
        <Box onClick={addPomodoro} style={{color:'white', cursor:'pointer'}} mr={2}>+</Box>
        <Box onClick={removePomodoro} style={{color:'white', cursor:'pointer'}}>-</Box>
      </Box>
    </Box>
  )
}

export default DailyCount