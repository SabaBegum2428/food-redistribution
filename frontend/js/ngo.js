// ============================
// NGO LOGIN
// ============================

const loginForm = document.getElementById("ngoLoginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("http://localhost:5000/api/ngo/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // Store NGO info
        localStorage.setItem("ngoId", data.ngoId);
        localStorage.setItem("ngoName", data.name);

        alert("Login successful!");
        window.location.href = "ngo-dashboard.html";
      } else {
        alert(data.message || "Login failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  });
}



// ============================
// LOAD NGO DASHBOARD DONATIONS
// ============================

async function loadNgoDonations() {
  const ngoId = localStorage.getItem("ngoId");

  if (!ngoId) {
    alert("Please login first");
    window.location.href = "ngo-login.html";
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/donations/ngo/${ngoId}`);
    const donations = await res.json();

    const container = document.getElementById("donationList");
    container.innerHTML = "";

    if (donations.length === 0) {
      container.innerHTML = "<p>No accepted donations yet.</p>";
      return;
    }

    donations.forEach(donation => {
      const div = document.createElement("div");
      div.classList.add("donation-card");

      div.innerHTML = `
        <h3>${donation.foodType}</h3>
        <p><strong>Quantity:</strong> ${donation.quantity}</p>
        <p><strong>Location:</strong> ${donation.location}</p>
        <p><strong>Status:</strong> ${donation.status}</p>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
  }
}



// ============================
// ACCEPT DONATION
// ============================

async function acceptDonation(donationId) {
  const ngoId = localStorage.getItem("ngoId");

  try {
    const res = await fetch(
      `http://localhost:5000/api/donations/accept/${donationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ngoId })
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Donation accepted!");
      loadNgoDonations();
    } else {
      alert(data.message || "Error accepting donation");
    }

  } catch (err) {
    console.error(err);
  }
}



// ============================
// AUTO LOAD WHEN DASHBOARD OPENS
// ============================

if (window.location.pathname.includes("ngo-dashboard.html")) {
  loadNgoDonations();
}