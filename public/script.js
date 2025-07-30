// script.js

// Check user role and redirect after login
function redirectToDashboard(user) {
  const db = firebase.firestore();
  db.collection("users").doc(user.uid).get().then((doc) => {
    const data = doc.data();
    const role = data.role;

    if (role === "admin") {
      window.location.href = "admin_panel.html";
    } else if (role === "recycler") {
      window.location.href = "recycler_dashboard.html";
    } else {
      window.location.href = "user_dashboard.html";
    }
  }).catch((error) => {
    console.error("Error fetching user role:", error);
  });
}

// Logout function for all dashboards
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}

// Fetch latest notifications for a user
function loadNotifications(userId, containerId) {
  const db = firebase.firestore();
  const container = document.getElementById(containerId);

  db.collection("notifications")
    .where("to", "==", userId)
    .orderBy("timestamp", "desc")
    .limit(10)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        container.innerHTML = "<p>No notifications found.</p>";
        return;
      }

      container.innerHTML = "";
      snapshot.forEach((doc) => {
        const note = doc.data();
        const item = document.createElement("div");
        item.className = "notification";
        item.innerHTML = `${note.message} <small>(${new Date(note.timestamp).toLocaleString()})</small>`;
        container.appendChild(item);
      });
    }).catch((err) => {
      container.innerHTML = "<p>Error loading notifications.</p>";
      console.error(err);
    });
}

// Load pickup history for the logged-in user
function loadHistory(userId, tableId) {
  const db = firebase.firestore();
  const table = document.getElementById(tableId);

  db.collection("pickup_history")
    .where("userId", "==", userId)
    .orderBy("timestamp", "desc")
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        table.innerHTML = "<tr><td colspan='4'>No history found.</td></tr>";
        return;
      }

      table.innerHTML = "";
      snapshot.forEach(doc => {
        const d = doc.data();
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${new Date(d.timestamp).toLocaleString()}</td>
          <td>${d.recycler || "N/A"}</td>
          <td>${d.society || "N/A"}</td>
          <td>${d.wasteType || "Mixed"}</td>
        `;
        table.appendChild(row);
      });
    }).catch(error => {
      table.innerHTML = "<tr><td colspan='4'>Error loading history.</td></tr>";
      console.error(error);
    });
}

// Detect if user is logged in on load
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User logged in:", user.email);
    // Optional: call redirectToDashboard(user); here if needed
  } else {
    console.log("User not logged in.");
  }
});
