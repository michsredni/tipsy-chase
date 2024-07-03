//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.querySelector("#splash-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

// botones
const startBtnNode = document.querySelector("#start-btn");
const reStartBtnNode = document.querySelector("#restart-btn");

// score
const scoreNode = document.querySelector("#score");
const finalScoreNode = document.querySelector("#final-score")

// game box
const gameBoxNode = document.querySelector("#game-box");

// id de intervals
let mainIntervalId = null;
let vasosAguaIntervalId = null;
let alcoholIntervalId = null;



//* VARIABLES GLOBALES DEL JUEGO
let personaObj = null; // esto significa que la persona no existe aun, existirá más adelante
let vasoDeAguaObj = null;
let alcoholObj = null;

let vasosDeAguaArr = [];
let alcoholArr = [];

//* FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  splashScreenNode.style.display = "none";
  scoreNode.innerText = 0

  gameScreenNode.style.display = "flex";
  gameOverScreenNode.style.display = "none";

  personaObj = new Persona();
  vasosDeAguaArr = [];
  alcoholArr = [];

  // iniciar el intervalo inicial del juego
  mainIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60));

  // iniciar el intervalo que aparecen vasos de agua en el juego
  vasosAguaIntervalId = setInterval(() => {
    vasoDeAguaAppear();
  }, 4000);

  // iniciar el intervalo que aparece alcohol en el juego
  alcoholIntervalId = setInterval(() => {
    alcoholAppear();
  }, 1500);
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
  colisionPersonaConAgua();
  colisionPersonaConAlcohol();
}

function gameOver() {
  // 1. todos los intervalos deben detenerse <<<
  clearInterval(mainIntervalId)
  clearInterval(vasosAguaIntervalId);
  clearInterval(alcoholIntervalId);
  // 2. ocultar pantalla de juego
  gameScreenNode.style.display = "none";
  // 3. mostrar pantalla game over
  gameOverScreenNode.style.display = "flex";
  // 4. que sea borrar todos los nodos de los elementos del juego (gamebox)
  gameBoxNode.innerHTML = "";
// 5. aparece score final
  finalScoreNode.innerText++
}

function vasoDeAguaAppear() {
  let randomPositionX = Math.floor(Math.random() * gameBoxNode.offsetWidth);

  let vasosDeAgua = new VasoAgua(randomPositionX);
  vasosDeAguaArr.push(vasosDeAgua);
}

function alcoholAppear() {
  let randomPositionX = Math.floor(Math.random() * gameBoxNode.offsetWidth);
  let randomAlcohol = Math.round(Math.random());
  let alcoholImg = "";
  if (randomAlcohol === 0) {
    alcoholImg = "white";
  } else {
    alcoholImg = "red";
  }

  let alcoholType = new Alcohol(randomPositionX, alcoholImg);
  alcoholArr.push(alcoholType);
}

function colisionPersonaConAgua() {
  vasosDeAguaArr.forEach((eachVasoDeAgua) => {
    if (
      eachVasoDeAgua.x < personaObj.x + personaObj.w &&
      eachVasoDeAgua.x + personaObj.w > personaObj.x &&
      eachVasoDeAgua.y < personaObj.y + personaObj.h &&
      eachVasoDeAgua.y + personaObj.h > personaObj.y
    ) {
      gameOver();
    }
  });
}

function colisionPersonaConAlcohol() {
  alcoholArr.forEach((eachAlcohol, index) => {
    if (
      eachAlcohol.x < personaObj.x + personaObj.w &&
      eachAlcohol.x + personaObj.w > personaObj.x &&
      eachAlcohol.y < personaObj.y + personaObj.h &&
      eachAlcohol.y + personaObj.h > personaObj.y
    ) {
      let objetoColisionado = alcoholArr[index];
      alcoholArr.splice(index, 1);
      objetoColisionado.node.remove();
      scoreNode.innerText++;
    }
  });
}

//* EVENT LISTENER
startBtnNode.addEventListener("click", () => {
  startGame();
});

reStartBtnNode.addEventListener("click", () => {
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
    - moveSides() ✅
- vaso de agua
    - x, y, w, h ✅
    - vasoDeAguaAppear()✅
    - automaticMovement()✅
 - alcohol
     - x, y, w, h✅
     - alcoholAppear()✅
     - automaticMovement()✅
- colisionPersonaConAgua()✅
- colisionPersonaConAlcohol()✅
- score✅
- subirScore()
- gameOver()
*/
