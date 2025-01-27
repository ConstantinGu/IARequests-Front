// Remplacer ci-dessous par TON URL d'Apps Script
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwAgXTVwpmysE_ZhXtPpq-v1Jes9ffh4HgrsBWyqHhJcGGhN2b36ggGxI_U243cW9riUQ/exec";

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("iaRequestForm");
  const messageArea = document.getElementById("messageArea");

  // Écouter l'événement "submit"
  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs du formulaire
    const formData = new FormData(form);
    const data = {
      nomDemandeur: formData.get("nomDemandeur"),
      departement: formData.get("departement"),
      besoin: formData.get("besoin"),
      description: formData.get("description"),
      urgence: formData.get("urgence"),
    };

    // Envoyer la requête POST vers l'Apps Script
    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => {
      if (json.status === "success") {
        // Afficher un message de succès
        messageArea.innerHTML = `
          <div class="alert alert-success">
            Votre demande a bien été enregistrée !
          </div>
        `;
        // Réinitialiser le formulaire
        form.reset();
      } else {
        // Afficher un message d'erreur
        messageArea.innerHTML = `
          <div class="alert alert-danger">
            Une erreur est survenue: ${json.message}
          </div>
        `;
      }
    })
    .catch(error => {
      console.error("Erreur:", error);
      messageArea.innerHTML = `
        <div class="alert alert-danger">
          Erreur lors de l'envoi des données.
        </div>
      `;
    });
  });
});
