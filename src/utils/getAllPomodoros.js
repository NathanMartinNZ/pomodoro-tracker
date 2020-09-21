import db from "../firebase";

const getAllPomodoros = async () => {
  let data = [];
  const firestoreDb = db.firestore();
  await firestoreDb
    .collection("pomodoros")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        data.push(doc.data());
      });
    });

  let reorderedData = data.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  return reorderedData;
};

export default getAllPomodoros;
