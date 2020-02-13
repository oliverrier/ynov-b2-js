import Helpers from "./Helpers.js";
import Serie from "./Classes/Serie.js";
import Film from "./Classes/Film.js";



const apiKey = "0ade470e767df27c679a9c551204ac62";

const traiterMedia = (data, type) => {
    const media = type == "movie" ? new Film(data) : new Serie(data)
    media.remplir()
}


const chargerMedia = () => {
    const id = Helpers.getParam("id")
    const type = Helpers.getParam("type")
    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=fr-FR`
    axios
        .get(url)
        .then(response => traiterMedia(response.data, type))
        .catch(error => {
            if (error.response && error.response.status == 404) {
                alert("Média introuvable !")
            }
            console.error(error);
        });
};

window.addEventListener("load", chargerMedia);
