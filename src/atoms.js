import { atom } from "recoil"

export const millisecondsAtom = atom({
  key: "milliseconds",
  default: 1500
})

export const timerEnabledAtom = atom({
  key: "timerEnabled",
  default: false
})