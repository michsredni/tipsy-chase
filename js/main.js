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

//* FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  // TODO 1. Ocultar la pantalla de inicio
  splashScreenNode.style.display = "none";

  // TODO 2. Mostrar la pantalla de juego
  gameScreenNode.style.display = "flex";

  // TODO 3. Mostrar los elementos iniciales del juego

  // TODO 4. Iniciar el gameLoop
  setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60));
}

function gameLoop() {
  //.todo lo que hay en esta función se ejecuta 60 veces
  // cosas que automaticamente van sucediendo en el juego

}

//* EVENT LISTENER
startBtnNode.addEventListener("click", () => {
  startGame();
});


//* PLANIFICACION
/* 
- el fondo
- la persona
    - x, y, w, h
    - personWallColision()
    - moveSides()
- alcohol
    - x, y, w, h
    - alcoholAppear()
    - automaticMovement()
- vaso de agua
    - x, y, w, h
    - waterAppear()
    - automaticMovement()
- colisionPersonaConAgua()
- colisionPersonaConAlcohol()
- score
- subirScore()
- gameOver()
*/
