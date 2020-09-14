import db from "../firebase";

const updateDb = (pomodoros) => {
  const firestoreDb = db.firestore()
  firestoreDb
    .collection("pomodoros")
    .doc("pZ3JwKUJ7oV32wlb2EAx") // TODO: change to today's doc
    .update({ count: pomodoros })
}

export default updateDb