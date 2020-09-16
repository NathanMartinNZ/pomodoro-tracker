import db from "../firebase";

const updateDb = (pomodoros) => {
  const firestoreDb = db.firestore()
  firestoreDb
    .collection("pomodoros")
    .where("date", ">=", new Date(Date.now() - ( 3600 * 1000 * 24)))
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