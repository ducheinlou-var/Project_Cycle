

// ################ CONNEXION ADAFRUIT ######################

let username = "XXX";
let activeKey = "XXX";

const IO = new AdafruitIO(username, activeKey);
let currentTemperature = 0; 

// ################# ELEMENTS HTML #####################
const menstrualPhase = document.querySelector("#menstrual");
const folicularPhase = document.querySelector("#folicular");
const ovulationPhase = document.querySelector("#ovulation");
const lutealPhase = document.querySelector("#luteal");


// recuperer des valeurs depuis adafruit de temps en temps
IO.setLimit(1); 

setInterval(function() {
    IO.getData("temperature", function(data) {
    console.log(data.feed, data.json[0].value);
    currentTemperature = parseInt(data.json[0].value);
    mettreAJourPhaseAAficher();
    });
}, 5000);


IO.getData("temperature", function(data) {
    console.log(data.feed, data.json[0].value);
    currentTemperature = parseInt(data.json[0].value);
    mettreAJourPhaseAAficher();
    });

// ################ bulle  ######################

document.querySelector("#progesterone").addEventListener("click", function() {
    document.querySelector(".bulle.bleu").classList.toggle("inactive");
    document.querySelector(".bulle.bordeau").classList.add("inactive");
})
document.querySelector("#estrogen").addEventListener("click", function() {
    document.querySelector(".bulle.bordeau").classList.toggle("inactive");
    document.querySelector(".bulle.bleu").classList.add("inactive");
})



// ################# LES PHASES #######################

const mettreAJourPhaseAAficher = () => {
    const phases = ["menstrual", "folicular", "ovulation", "luteal"];

let phaseActuelle = "";

// on passe toutes les phases en inactive au début
mettreToutesLesPhasesInactives();

// on récupère la phase à afficher en fonction de la température
if(currentTemperature < 27){
    phaseActuelle = "menstrual";
    // on passe menstrual en active
    mettreToutesLesPhasesInactives();
    menstrualPhase.classList.remove("inactive");
    menstrualPhase.classList.add("active");
    }   
if(currentTemperature >= 27 && currentTemperature < 29){
    phaseActuelle = "folicular";
    mettreToutesLesPhasesInactives();
    folicularPhase.classList.remove("inactive");
    folicularPhase.classList.add("active");
    }
if(currentTemperature >= 29 && currentTemperature < 31){
    phaseActuelle = "ovulation";
    mettreToutesLesPhasesInactives();
    ovulationPhase.classList.remove("inactive");
    ovulationPhase.classList.add("active");
    }
if(currentTemperature >= 31){
    phaseActuelle = "luteal";
    mettreToutesLesPhasesInactives();
    lutealPhase.classList.remove("inactive");
    lutealPhase.classList.add("active");
    }
    console.log("phase actuelle : " + phaseActuelle);

}

const mettreToutesLesPhasesInactives = () => {
    menstrualPhase.classList.add("inactive");
    folicularPhase.classList.add("inactive");
    ovulationPhase.classList.add("inactive");
    lutealPhase.classList.add("inactive");

    menstrualPhase.classList.remove("active");
    folicularPhase.classList.remove("active");
    ovulationPhase.classList.remove("active");
    lutealPhase.classList.remove("active");
}


   
// ################ CLIC SUR LA FLÈCHE ####################
document.querySelector(".fleche").addEventListener("click", function () {
  if (!phaseActuelle) {
    // la température n'est pas encore arrivée
    document.querySelector(".lucid").textContent = "lucid... un instant";
    return;
  }
  showPhase(phaseActuelle);
  document.getElementById(phaseActuelle).scrollIntoView({ behavior: "smooth" });
});
