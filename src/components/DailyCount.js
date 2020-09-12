import React from 'react'
import { Box, Grid, Paper } from '@material-ui/core';
import { useRecoilState } from "recoil"
import { pomodorosAtom } from "../atoms"

function DailyCount() {
  const [pomodoros] = useRecoilState(pomodorosAtom)

  return (
    <Box mt={2}>
      <Grid item xs={12}>
        <Paper>
          {pomodoros}
        </Paper>
      </Grid>
    </Box>
  )
}

export default DailyCount