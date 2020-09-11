import React from 'react'
import { Box, AppBar, Typography } from '@material-ui/core';

function Header() {
  return (
    <>
      <AppBar position="static">
        <Box p={1}>
          <Typography variant="h5">Pomodoro Tracker</Typography>
        </Box>
      </AppBar>
    </>
  )
}

export default Header
