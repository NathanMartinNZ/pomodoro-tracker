import db from "../firebase";

const updateDb = (pomodoros) => {
  const today = new Date().toDateString()
  const firestoreDb = db.firestore()
  firestoreDb
    .collection("pomodoros")
    .where("date", ">=", today)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        firestoreDb
          .collection("pomodoros")
          .doc(doc.id)
          .update({ count: pomodoros })
      })
    })
}

export default updateDb