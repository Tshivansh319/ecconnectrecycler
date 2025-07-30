firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const db = firebase.firestore();
    db.collection("users").doc(user.uid).get().then(doc => {
      if (doc.exists) {
        const role = doc.data().role;
        if (role === "user") {
          window.location.href = "user_dashboard.html";
        } else if (role === "recycler") {
          window.location.href = "recycler_dashboard.html";
        } else {
          window.location.href = "select_role.html";
        }
      } else {
        window.location.href = "select_role.html";
      }
    });
  } else {
    window.location.href = "login.html";
  }
});


async function markArrival() {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("User not authenticated");
    return;
  }

  const db = firebase.firestore();
  const userDoc = await db.collection('users').doc(user.uid).get();
  if (!userDoc.exists) {
    alert("User data not found");
    return;
  }

  const userData = userDoc.data();
  const society = userData.society;
  const name = userData.name;

  const residents = await db.collection('users')
    .where('society', '==', society)
    .where('role', '==', 'resident')
    .get();

  residents.forEach(async (doc) => {
    await db.collection('notifications').add({
      to: doc.id,
      message: `[Recycler ${name}] has arrived at your society gate. Drop your recyclables now!`,
      timestamp: Date.now()
    });
  });

  alert("Arrival marked and notifications sent!");
}
