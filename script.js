// Remplacer ci-dessous par TON URL d'Apps Script
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwAgXTVwpmysE_ZhXtPpq-v1Jes9ffh4HgrsBWyqHhJcGGhN2b36ggGxI_U243cW9riUQ/exec";
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("iaRequestForm");
  const messageArea = document.getElementById("messageArea");

  // Intercepter la soumission du formulaire
  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupère les champs du formulaire sous forme de FormData
    const formData = new FormData(form);

    // Envoi vers l’Apps Script
    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      // Pas de mode: "cors", pas de "Content-Type" custom => pas de préflight
      body: formData
    })
    .then(response => response.text())        // On lit la réponse en "texte"
    .then(text => {
      let json;
      try {
        json = JSON.parse(text);             // Parse en JSON
      } catch(e) {
        throw new Error("Réponse invalide du serveur");
      }

      if (json.status === "success") {
        // Message de succès
        messageArea.innerHTML = `
          <div class="alert alert-success">
            Votre demande a bien été enregistrée !
          </div>
        `;
        // On réinitialise le formulaire
        form.reset();
      } else {
        // Message d’erreur renvoyé par le script
        messageArea.innerHTML = `
          <div class="alert alert-danger">
            Une erreur est survenue : ${json.message}
          </div>
        `;
      }
    })
    .catch(error => {
      // Si la requête a échoué ou qu’on ne reçoit pas une réponse valable
      console.error("Erreur:", error);
      messageArea.innerHTML = `
        <div class="alert alert-danger">
          Une erreur est survenue : ${error}
        </div>
      `;
    });
  });
});
