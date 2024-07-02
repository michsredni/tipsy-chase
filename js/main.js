//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.querySelector("#splash-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

// botones
const startBtnNode = document.querySelector("#start-btn");

// game box
const gameBoxNode = document.querySelector("#game-box");

//* VARIABLES GLOBALES DEL JUEGO
let personaObj = null; // esto significa que la persona no existe aun, existirá más adelante
let vasosDeAguaArr = [];
let alcoholArr = [];

//* FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  splashScreenNode.style.display = "none";

  gameScreenNode.style.display = "flex";

  personaObj = new Persona();

  setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60));

  setInterval(() => {
    vasoDeAguaAppear();
  }, 4000);

  setInterval(() => {
    alcoholAppear();
  }, Math.random() * 3000);
}

function gameLoop() {
  //.todo lo que hay en esta función se ejecuta 60 veces
  // cosas que automaticamente van sucediendo en el juego
  vasosDeAguaArr.forEach((eachVasoDeAgua) => {
    eachVasoDeAgua.automaticMovement();
  });
  alcoholArr.forEach((eachAlcohol) => {
    eachAlcohol.automaticMovementAlcohol();
  });
}

function vasoDeAguaAppear() {
  let randomPositionX = Math.floor(Math.random() * gameBoxNode.offsetWidth);

  let vasosDeAgua = new VasoAgua(randomPositionX);
  vasosDeAguaArr.push(vasosDeAgua);
}

function alcoholAppear() {
  let randomPositionX = Math.floor(Math.random() * gameBoxNode.offsetWidth);

  let alcoholWhite = new Alcohol(randomPositionX, "white");
  alcoholArr.push(alcoholWhite);

  // añadir vino rojo
  let alcoholRed = new Alcohol(randomPositionX , "red");
  alcoholArr.push(alcoholRed);
}

//* EVENT LISTENER
startBtnNode.addEventListener("click", () => {
  startGame();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    personaObj.moveSides("right");
  } else if (event.key === "ArrowLeft") {
    personaObj.moveSides("left");
  }
});

//* PLANIFICACION
/* 
- el fondo ✅
- la persona
    - x, y, w, h ✅
    - personWallColision()
    - moveSides() ✅
- vaso de agua
    - x, y, w, h ✅
    - vasoDeAguaAppear()✅
    - automaticMovement()✅
 - alcohol
     - x, y, w, h
     - alcoholAppear()
     - automaticMovement()
- colisionPersonaConAgua()
- colisionPersonaConAlcohol()
- score
- subirScore()
- gameOver()
*/
