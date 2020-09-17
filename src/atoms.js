import { atom } from "recoil"

export const pomodorosAtom = atom({
  key: "pomodoros",
  default: 0
})

export const startTimeAtom = atom({
  key: "startTime",
  default: 10
})