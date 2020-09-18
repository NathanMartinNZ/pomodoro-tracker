import React from "react";
import { Box, AppBar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <AppBar position="static">
        <Box p={1}>
          <Typography className="logo" variant="h5" component={Link} to={"/"}>
            Pomodoro Tracker
          </Typography>
        </Box>
      </AppBar>
    </>
  );
}

export default Header;
