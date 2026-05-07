// LOGIN
const loginForm =
  document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const email =
        document.getElementById("email").value;

      const password =
        document.getElementById("password").value;

      const res = await fetch(
        "/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await res.json();

      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        );

        alert("Login exitoso");

        window.location.href =
          "/dashboard.html";

      } else {

        alert(data.message);

      }

    }
  );

}



// REGISTRO
const registerForm =
  document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const username =
        document.getElementById("username").value;

      const email =
        document.getElementById("email").value;

      const password =
        document.getElementById("password").value;

      const res = await fetch(
        "/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username,
            email,
            password
          })
        }
      );

      const data = await res.json();

      alert(data.message);

    }
  );

}