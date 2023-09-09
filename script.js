const cityInput = document.getElementById("cityInput");
const getWeather = document.getElementById("getWeather");
const weatherInfos = document.getElementById("weatherInfos");

getWeather.addEventListener("click", () => {
  // création d'une clé API qui servivra à récupérer les données météo
  // ici je génére une clé
  const apiKey = "8c906cced91b6a44c48218d6a6bd563a";

  // création d'une constante pour récupérer la valeur du champ
  const city = cityInput.value;
  // création d'une constante, l'URL est interrogé OpenWeatherMap pour récupérer les données
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  // Fonction fetch pour récupérer une requéte http pour récupérer les données via l'URL, les données sont convertis en json
  fetch(apiUrl)
    // réponse de l'API recu et conversion en JSON
    .then((response) => response.json())
    // Traitement des données recues et conversion des températures en celsius, extrait la description
    .then((data) => {
      const temperature = (data.main.temp - 273.15).toFixed(1);
      const description = data.weather[0].description;
      const weatherIcon = getWeatherIcon(description);
      // Met à jour le contenu en affichant les données appropriées à la ville au format HTML
      weatherInfos.innerHTML = `Météo à ${city} : ${temperature} C°  ${description} : <br> <br>
            <img src="${weatherIcon}" alt="image_météo">`;
    })
    // En cas d'erreur de requete, l'erreur s'affiche
    .catch((error) => {
      console.error(error);
      weatherInfos.innerHTML = `une erreur s'est produite veuillez ressayez`;
    });
});

// fonction qui renvoit une image adaptée au temps, si le temps est ensoléillé, une icone soleil sera afficher

function getWeatherIcon(description) {
  switch (description.toLowerCase()) {
    case "clear sky":
      return "/icones/sunny.png";
    case "overcast clouds":
      return "/icones/icons8-partly-cloudy-day-48.png";
    default:
      return "erreur";
    case "few clouds":
      return "/icones/clouds.png";
  }
}
