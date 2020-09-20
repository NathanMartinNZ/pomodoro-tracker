import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { pomodorosAtom } from "../atoms";
import updateDb from "../utils/updateDb";

const styles = {
  actionBox: {
    background: "#3f51b5",
    cursor: "default",
    borderRadius: 10,
    fontWeight: "bold",
  },
  actionBoxBtn: {
    color: "white",
    cursor: "pointer",
  },
  countBox: {
    background: "#f2f2f2",
    cursor: "default",
    borderRadius: 10,
  },
};

function DailyCount() {
  const [hovering, setHovering] = useState(false);
  const [pomodoros, setPomodoros] = useRecoilState(pomodorosAtom);
  const pomodorosArr = [...Array(pomodoros).keys()];

  const addPomodoro = () => {
    updateDb(pomodoros + 1);
    setPomodoros(pomodoros + 1);
  };

  const removePomodoro = () => {
    updateDb(pomodoros - 1);
    setPomodoros(pomodoros - 1);
  };

  return (
    <Box
      mt={2}
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {pomodorosArr.map((pomodoro) => {
        return (
          <Box key={pomodoro} className="count-button" style={styles.countBox} m={1}>
            ✔
          </Box>
        );
      })}
      <Box
        className={`count-button action-button ${hovering ? "active" : ""}`}
        style={styles.actionBox}
        m={1}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
      >
        <Box onClick={addPomodoro} style={styles.actionBoxBtn} mr={2}>
          +
        </Box>
        <Box onClick={removePomodoro} style={styles.actionBoxBtn}>
          -
        </Box>
      </Box>
    </Box>
  );
}

export default DailyCount;
