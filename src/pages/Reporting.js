import React from "react";
import { Container, Box, Grid, Paper } from "@material-ui/core";
import Chart from "../components/Chart";

function Reporting() {
  return (
    <>
      <Box mt={6}>
        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <Paper>
              <Container>
                <Box pt={2} pb={2}>
                  <Chart />
                </Box>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Reporting;
