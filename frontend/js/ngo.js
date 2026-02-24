const API = "http://localhost:5000/ngo";



let currentUser;


/* 🔐 CHECK LOGIN */
auth.onAuthStateChanged((user) => {

  if (!user) {
    window.location.href = "login.html";
  } else {
    currentUser = user;
  }

});


/* 📦 LOAD AVAILABLE DONATIONS */
window.loadDonations = async function () {

  try {

    const res =
      await fetch(`${API}/available`);

    const donations =
      await res.json();


    if (donations.length === 0) {
      document.getElementById("donationList")
        .innerHTML = "<p>No donations available</p>";
      return;
    }


    const list = donations.map(d => `
      <div class="card">

        <p><b>Food:</b> ${d.foodType}</p>
        <p><b>Quantity:</b> ${d.quantity}</p>
        <p><b>Location:</b> ${d.location}</p>

        <button onclick="respondDonation('${d.id}', 'accept')">
          Accept
        </button>

        <button onclick="respondDonation('${d.id}', 'reject')">
          Reject
        </button>

      </div>
    `).join("");


    document.getElementById("donationList")
      .innerHTML = list;

  } catch (err) {
    console.error(err);
    alert("Failed to load donations");
  }
};



/* ✅ ACCEPT / REJECT */
window.respondDonation =
async function (donationId, action) {

  try {

    const res = await fetch(
      `${API}/respond`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          donationId,
          ngoId: currentUser.uid,
          action
        })
      }
    );

    const data = await res.json();

    alert(data.message);

    loadDonations(); // refresh list

  } catch (err) {
    console.error(err);
    alert("Action failed");
  }
};
