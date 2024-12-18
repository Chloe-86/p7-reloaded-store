export function errorApi(errorType) {
  switch (errorType) {
    case "404":
      return "La page que vous cherchez n'existe pas.";
    case "500":
      return "Désolé, il y a un problème avec le serveur.";
    case "401":
      return "Vous devez vous connecter pour accéder à cette page.";
    case "403":
      return "Vous n'avez pas la permission d'accéder à cette page.";
    case "400":
      return "La demande que vous avez envoyée est incorrecte.";
    case "408":
      return "La demande a pris trop de temps, veuillez réessayer.";
    case "502":
      return "Le serveur rencontre des problèmes de communication.";
    case "503":
      return "Le service est temporairement indisponible.";
    case "504":
      return "La passerelle n'a pas répondu à temps.";
    default:
      return "Un problème est survenu, veuillez réessayer plus tard.";
  }
}

  