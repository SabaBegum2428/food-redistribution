const API = "http://localhost:5000/api/ngo";

// REGISTER
document.getElementById("ngoRegisterForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: name.value,
    email: email.value,
    password: password.value,
    registrationNumber: regNumber.value,
    contact: contact.value,
    address: address.value
  };

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.message);
});

// LOGIN
document.getElementById("ngoLoginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value
    })
  });

  const result = await res.json();

  if(result.token){
    localStorage.setItem("ngoToken", result.token);
    window.location.href = "ngo-dashboard.html";
  } else {
    alert(result.message);
  }
});