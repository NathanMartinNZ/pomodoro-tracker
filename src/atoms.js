import { atom } from "recoil"

export const millisecondsAtom = atom({
  key: "milliseconds",
  default: 5 // 1500 == 25 mins
})

export const timerEnabledAtom = atom({
  key: "timerEnabled",
  default: false
})

export const pomodorosAtom = atom({
  key: "pomodoros",
  default: 0
})