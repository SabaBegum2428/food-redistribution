// ==============================
// DONOR DASHBOARD SCRIPT
// ==============================

const donorId = localStorage.getItem("donorId");

// Redirect if not logged in
if (!donorId) {
  window.location.href = "login.html";
}



// ==============================
// POST DONATION
// ==============================

async function postDonation() {
  const foodType = document.getElementById("foodType").value;
  const quantity = document.getElementById("quantity").value;
  const location = document.getElementById("location").value;

  if (!foodType || !quantity || !location) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        donorId,
        foodType,
        quantity,
        location
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Donation posted successfully!");
      loadDonations();
      clearForm();
    } else {
      alert(data.error || "Error posting donation");
    }

  } catch (err) {
    console.error(err);
  }
}



// ==============================
// LOAD DONATION HISTORY
// ==============================

async function loadDonations() {
  try {
    const res = await fetch("http://localhost:5000/api/donations");
    const donations = await res.json();

    const myDonations = donations.filter(
      d => d.donorId === donorId
    );

    const historyDiv = document.getElementById("donationHistory");
    historyDiv.innerHTML = "";

    let total = 0;
    let meals = 0;
    let activePickup = "No active pickup";

    myDonations.forEach(donation => {

      total++;
      meals += parseInt(donation.quantity) || 0;

      if (donation.status === "Accepted") {
        activePickup = "Pickup scheduled";
      }

      const div = document.createElement("div");
      div.innerHTML = `
        <p>
          <strong>${donation.foodType}</strong> |
          Qty: ${donation.quantity} |
          Location: ${donation.location} |
          Status: ${donation.status || "Pending"}
        </p>
        <hr>
      `;

      historyDiv.appendChild(div);
    });

    document.getElementById("totalDonations").innerText = total;
    document.getElementById("mealsDonated").innerText = meals;
    document.getElementById("activePickup").innerText = activePickup;

  } catch (err) {
    console.error(err);
  }
}



// ==============================
// CLEAR FORM
// ==============================

function clearForm() {
  document.getElementById("foodType").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("location").value = "";
}



// ==============================
// LOGOUT
// ==============================

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("donorId");
  window.location.href = "login.html";
});



// ==============================
// MAKE FUNCTION GLOBAL (IMPORTANT)
// ==============================

window.postDonation = postDonation;



// ==============================
// LOAD DATA ON PAGE LOAD
// ==============================

loadDonations();