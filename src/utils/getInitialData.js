import db from "../firebase";

const getInitialData = async () => {
  let pomodoroCount = 0;
  const today = new Date().toDateString();
  const firestoreDb = db.firestore();

  await firestoreDb
    .collection("pomodoros")
    .where("date", "==", today)
    .get()
    .then((querySnapshot) => {
      let foundDoc = false;
      querySnapshot.forEach((doc) => {
        foundDoc = true;
        // Set initial pomodoros for today
        if (doc.data()) {
          pomodoroCount = doc.data().count;
        }
      });
      if (!foundDoc) {
        firestoreDb.collection("pomodoros").add({ date: new Date().toDateString(), count: 0 });
      }
    });

  return pomodoroCount;
};

export default getInitialData;
