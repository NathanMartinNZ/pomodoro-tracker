import React from "react"

import { Container } from "@material-ui/core"

import Header from "./components/Header"
import PomodoroTimer from "./components/PomodoroTimer"
import DailyCount from "./components/DailyCount"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Container maxWidth="sm">
          <PomodoroTimer />
          <DailyCount />
        </Container>
      </div>
    )
  }
}

export default App