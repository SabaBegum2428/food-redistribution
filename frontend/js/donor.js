const API = "http://localhost:5000/donor";



let currentUser;

/* 🔐 CHECK LOGIN */
auth.onAuthStateChanged(async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  currentUser = user;

  loadDashboard();
});

/* 📊 LOAD DASHBOARD DATA */
async function loadDashboard() {

  const uid = currentUser.uid;

  try {

    /* DONATION HISTORY */
    const historyRes =
      await fetch(`${API}/history/${uid}`);

    const history = await historyRes.json();

    /* TOTAL DONATIONS */
    document.getElementById("totalDonations")
      .innerText = history.length;

    /* TOTAL MEALS */
    let meals = 0;

    history.forEach(d => {
      meals += parseInt(d.quantity) || 0;
    });

    document.getElementById("totalMeals")
      .innerText = meals;

    /* ACTIVE PICKUP */
    const activeRes =
      await fetch(`${API}/active/${uid}`);

    const active = await activeRes.json();

    if (active.length > 0) {

      document.getElementById("activePickup")
        .innerHTML = active.map(d => `
          <p>
            <b>${d.foodType}</b> -
            ${d.status}
          </p>
        `).join("");

    } else {

      document.getElementById("activePickup")
        .innerText = "No active pickup";
    }

    /* HISTORY LIST */
    const list = history.map(d => `
      <div class="card">
        <p><b>${d.foodType}</b> - ${d.quantity}</p>
        <p>Status: ${d.status}</p>
      </div>
    `).join("");

    document.getElementById("historyList")
      .innerHTML = list;

  } catch (err) {
    console.error(err);
    alert("Failed to load dashboard");
  }
}


/* 🍱 POST DONATION */
window.postDonation = async function () {

  const foodType =
    document.getElementById("foodType").value;

  const quantity =
    document.getElementById("quantity").value;

  const location =
    document.getElementById("location").value;

  /* VALIDATION */
  if (!foodType || !quantity || !location) {
    alert("Please fill all fields");
    return;
  }

  const data = {
    donorId: currentUser.uid,
    foodType,
    quantity,
    location
  };

  try {

    const res = await fetch(
      `${API}/donate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    if (res.ok) {

      alert("Donation Posted Successfully!");

      /* CLEAR FORM */
      document.getElementById("foodType").value = "";
      document.getElementById("quantity").value = "";
      document.getElementById("location").value = "";

      loadDashboard();

    } else {
      alert("Failed to post donation");
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};
