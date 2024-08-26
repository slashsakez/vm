document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("upload-form");
  const statusDiv = document.getElementById("upload-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita il comportamento predefinito del modulo

    const formData = new FormData(form);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        statusDiv.textContent = "Immagini caricate con successo!";
      } else {
        statusDiv.textContent = "Errore nel caricamento delle immagini.";
      }
    } catch (error) {
      statusDiv.textContent = "Errore di rete: " + error.message;
    }
  });
});
