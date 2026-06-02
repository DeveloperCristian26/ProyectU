// ==========================
// LOGIN
// ==========================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ==========================
      // 🎯 PUNTOS LOGIN DIARIO
      // ==========================
      const hoy = new Date().toDateString();
      const ultimoLogin = localStorage.getItem("ultimoLogin");

      let puntos = parseInt(localStorage.getItem("points")) || 0;

      if (ultimoLogin !== hoy) {
        puntos += 5;
        localStorage.setItem("points", puntos);
        localStorage.setItem("ultimoLogin", hoy);
      }

      window.location.href = "/index.html";
    } else {
      alert("Credenciales incorrectas");
    }
  });
}


// ==========================
// REGISTRO (CORREGIDO)
// ==========================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      window.location.href = "/login.html";
    }
  });
}


// ==========================
// USUARIO
// ==========================
const user = JSON.parse(localStorage.getItem("user"));


// ==========================
// LOGOUT (CORRECTO)
// ==========================
window.logout = function () {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login.html";
};