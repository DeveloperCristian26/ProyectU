let currentUser = null;

// REGISTRO
function register() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (!user || !pass) return alert("Completa los campos");

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[user]) {
        alert("El usuario ya existe");
        return;
    }

    users[user] = { password: pass, points: 0 };
    localStorage.setItem("users", JSON.stringify(users));

    alert("Usuario registrado");
}

// LOGIN
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[user] || users[user].password !== pass) {
        alert("Datos incorrectos");
        return;
    }

    currentUser = user;

    document.getElementById("login").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    document.getElementById("userDisplay").innerText = user;
    updatePoints();
}

// LOGOUT
function logout() {
    currentUser = null;
    document.getElementById("login").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("hidden");
}

// PUNTOS
function updatePoints() {
    const users = JSON.parse(localStorage.getItem("users"));
    document.getElementById("points").innerText = users[currentUser].points;
}

// RETO
function completeChallenge() {
    const users = JSON.parse(localStorage.getItem("users"));
    users[currentUser].points += 10;

    localStorage.setItem("users", JSON.stringify(users));
    updatePoints();
}

// CHATBOT SIMPLE
function sendMessage() {
    const input = document.getElementById("chatInput").value;
    const chatbox = document.getElementById("chatbox");

    if (!input) return;

    chatbox.innerHTML += `<p><b>Tú:</b> ${input}</p>`;

    let response = "No entiendo tu pregunta.";

    if (input.toLowerCase().includes("html")) {
        response = "HTML se usa para estructurar páginas web.";
    } else if (input.toLowerCase().includes("css")) {
        response = "CSS sirve para diseñar páginas web.";
    } else if (input.toLowerCase().includes("javascript")) {
        response = "JavaScript permite agregar interactividad.";
    }

    chatbox.innerHTML += `<p><b>Bot:</b> ${response}</p>`;
    chatbox.scrollTop = chatbox.scrollHeight;

    document.getElementById("chatInput").value = "";
}