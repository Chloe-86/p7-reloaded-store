export function errorApi(errorType) {
    switch (errorType) {
      case "404":
        return "Page non trouvée";
      case "500":
        return "Erreur interne du serveur";
      case "401":
        return "Non autorisé";
      case "403":
        return "Accès refusé";
      case "400":
        return "Requête invalide";
      case "408":
        return "Délai d’attente dépassé";
      case "502":
        return "Mauvaise passerelle";
      case "503":
        return "Service indisponible";
      case "504":
        return "Délai de la passerelle dépassé";
      default:
        return "Erreur inconnue";
    }
  }
  