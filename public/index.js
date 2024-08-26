document.addEventListener("DOMContentLoaded", () => {
  fetch("/images")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Errore nel recupero delle immagini: " + response.statusText
        );
      }
      return response.json();
    })
    .then((images) => {
      const gallery = document.getElementById("photo-gallery");

      // Pulire il contenuto esistente
      gallery.innerHTML = "";

      // Aggiungere nuove immagini
      images.forEach((image, index) => {
        const div = document.createElement("div");
        div.className = "photo-container";
        div.innerHTML = `
                    <img class="bg-img" src="/upload_img/${image}" alt="" />
                    <div class="photo-info">
                        <div class="photo-number">${index} <span class="slash">/</span></div>
                    </div>
                `;
        gallery.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
});
