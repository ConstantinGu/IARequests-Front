// Remplacer ci-dessous par TON URL d'Apps Script
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwAgXTVwpmysE_ZhXtPpq-v1Jes9ffh4HgrsBWyqHhJcGGhN2b36ggGxI_U243cW9riUQ/exec";
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("iaRequestForm");
  const messageArea = document.getElementById("messageArea");

  // Sur "submit", on intercepte pour faire un fetch
  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Évite le rechargement de la page

    // Récupérer les données sous forme de FormData
    const formData = new FormData(form);

    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      // IMPORTANT :
      // 1) NE PAS mettre "Content-Type" à "application/json"
      // 2) NE PAS définir "mode: 'cors'" (on le laisse par défaut)
      // => Ainsi, pas de preflight et pas de blocage CORS
      body: formData
    })
    // On attend la réponse en "text"
    .then(response => response.text())
    .then(text => {
      // L'Apps Script renvoie un JSON, on parse le texte pour accéder au champ "status"
      let json;
      try {
        json = JSON.parse(text);
      } catch(e) {
        throw new Error("Réponse invalide du serveur");
      }

      if (json.status === "success") {
        messageArea.innerHTML = `
          <div class="alert alert-success">
            Votre demande a bien été enregistrée !
          </div>
        `;
        form.reset();
      } else {
        messageArea.innerHTML = `
          <div class="alert alert-danger">
            Une erreur est survenue : ${json.message}
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
