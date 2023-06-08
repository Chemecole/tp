document.getElementById('formTP').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page après la soumission du formulaire
  
    var titleTP = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    // Récupérez les autres valeurs des champs du formulaire
  
    var data = {
      username: username,
      password: password,
      // Ajoutez ici les autres valeurs des champs du formulaire
    };
  
    // Votre logique d'authentification ici, vérifiez le mot de passe
  
    // Si l'authentification réussit, envoyez les données au serveur
    fetch('url_de_votre_serveur', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      // Gérez la réponse du serveur
      // par exemple, affichez un message de réussite ou d'échec
    })
    .catch(function(error) {
      // Gérez les erreurs lors de l'envoi de la requête
    });
  });