document.getElementById("submit-btn").addEventListener("click", function () {
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `password=${encodeURIComponent(password)}`,
  })
    .then((response) => {
      if (response.ok) {
        // Se il login è andato a buon fine, fai il redirect a una rotta sicura
        window.location.href = "/dashboard.html";
      } else {
        // Se il login è fallito, mostra il messaggio di errore
        errorMessage.textContent = "Incorrect password";
        errorMessage.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
