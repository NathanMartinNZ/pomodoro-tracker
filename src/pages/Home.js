import React, { useEffect, useContext } from "react";
import PomodoroTimer from "../components/PomodoroTimer";
import DailyCount from "../components/DailyCount";
import { Container, Box, Grid, Paper, Typography } from "@material-ui/core";
import getInitialData from "../utils/getInitialData";
import { useRecoilState } from "recoil";
import { pomodorosAtom } from "../atoms";
import { AuthContext } from "../components/Auth/Auth";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const [_, setPomodoros] = useRecoilState(pomodorosAtom);

  useEffect(() => {
    getInitialData().then((data) => setPomodoros(data));
  }, []);

  return (
    <Box mt={6}>
      <Grid container justify="center">
        <Grid item xs={12} md={4}>
          <Paper>
            <Container>
              <Box pt={2} pb={2}>
                <PomodoroTimer />
                <DailyCount />
              </Box>
            </Container>
          </Paper>
          {currentUser.email === "demo@demo.com" && (
            <Container>
              <Box mt={1}>
                <Typography>Note: Pomodoros do not persist to database on demo account</Typography>
              </Box>
            </Container>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
