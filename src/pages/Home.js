import React from "react";
import PomodoroTimer from "../components/PomodoroTimer";
import DailyCount from "../components/DailyCount";
import { Container, Box, Grid, Paper } from "@material-ui/core";

function Home({ loading }) {
  return (
    <>
      {!loading && (
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
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default Home;
