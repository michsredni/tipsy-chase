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
const finalScoreNode = document.querySelector("#final-score");

// game box
const gameBoxNode = document.querySelector("#game-box");

// vidas
const vidasNode = document.querySelector("#vidas")

// id de intervals
let mainIntervalId = null;
let vasosAguaIntervalId = null;
let alcoholIntervalId = null;
let bonusIntervalId = null

//* VARIABLES GLOBALES DEL JUEGO
let personaObj = null; // esto significa que la persona no existe aun, existirá más adelante

let vasosDeAguaArr = [];
let alcoholArr = [];
let bonusArr = []

let audio = new Audio("./audio/select-sound-121244.mp3");
let audioGameOver = new Audio("./audio/8-bit-video-game-lose-sound-version-1-145828.mp3");

//* FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  splashScreenNode.style.display = "none";
  scoreNode.innerText = 0;

  gameScreenNode.style.display = "flex";
  gameOverScreenNode.style.display = "none";

  personaObj = new Persona();
  vasosDeAguaArr = [];
  alcoholArr = [];
  bonusArr = []

  // iniciar el intervalo inicial del juego
  mainIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60));

  // iniciar el intervalo que aparecen vasos de agua en el juego
  vasosAguaIntervalId = setInterval(() => {
    vasoDeAguaAppear();
  }, 1500);

  // iniciar el intervalo que aparece alcohol en el juego
  alcoholIntervalId = setInterval(() => {
    alcoholAppear();
  }, 500);

  bonusIntervalId = setInterval(() => {
    bonusAppear()
  }, 20000)

  caminandoObjetoIntervalId = setInterval(() => {
    personaObj.changeImage()
  }, 150)


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
  bonusArr.forEach((eachBonus) => {
    eachBonus.automaticMovementBonus()
  })
  colisionPersonaConAgua();
  colisionPersonaConAlcohol();
  colisionBonusConPersona()
}

function gameOver() {
  // 1. todos los intervalos deben detenerse <<<
  clearInterval(mainIntervalId);
  clearInterval(vasosAguaIntervalId);
  clearInterval(alcoholIntervalId);
  // 2. ocultar pantalla de juego
  gameScreenNode.style.display = "none";
  // 3. mostrar pantalla game over
  gameOverScreenNode.style.display = "flex";
  // 4. que sea borrar todos los nodos de los elementos del juego (gamebox)
  gameBoxNode.innerHTML = "";
  // 5. aparece score final
  finalScoreNode.innerText = scoreNode.innerText;

  audioGameOver.play();
  audio.pause();
}

function vasoDeAguaAppear() {
  let randomPositionX = Math.floor(Math.random() * gameBoxNode.offsetWidth);

  vasoDeAguaObj = new VasoAgua(randomPositionX);
  vasosDeAguaArr.push(vasoDeAguaObj);
}

function alcoholAppear() {
  let randomPositionX = Math.floor(Math.random() * gameBoxNode.offsetWidth);
  // let randomAlcohol = Math.floor(Math.random() * alcoholArr.length);
  let numRandom = Math.floor(Math.random() * 3);
  let alcoholImg = "";
  if (numRandom === 0) {
    alcoholImg = "white";
  } else if (numRandom === 1) {
    alcoholImg = "red";
  } else if (numRandom === 2) {
    alcoholImg = "cocktail";
  }

  let alcoholObj = new Alcohol(randomPositionX, alcoholImg);
  alcoholArr.push(alcoholObj);

}

function colisionPersonaConAgua() {
  vasosDeAguaArr.forEach((eachVasoDeAgua, index) => {
    if (
      eachVasoDeAgua.x < personaObj.x + personaObj.w &&
      eachVasoDeAgua.x + personaObj.w > personaObj.x &&
      eachVasoDeAgua.y < personaObj.y + personaObj.h &&
      eachVasoDeAgua.y + personaObj.h > personaObj.y
    ) {
      vasosDeAguaArr.splice(index, 1);
      eachVasoDeAgua.node.remove();
      if (personaObj.vidas === 3) {
        personaObj.vidas -= 1;
        vidasNode.innerText = "💙💙";      
      } else if (personaObj.vidas === 2) {
        personaObj.vidas -= 1;
        vidasNode.innerText = "💙";
      } else if (personaObj.vidas === 1) {
        gameOver();
      }
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
      audio.play();
    }
  });
  incrementarVelocidad ()
}

function incrementarVelocidad (){
  if (scoreNode.innerText >= 5 && scoreNode.innerText < 10) {
    alcoholArr.forEach((eachAlcohol) => {
      eachAlcohol.speed = 3
    })
    vasosDeAguaArr.forEach((eachVasoDeAgua) => {
      eachVasoDeAgua.speed = 3
    })

  } else if (scoreNode.innerText >= 10 && scoreNode.innerText < 20){
    alcoholArr.forEach((eachAlcohol) => {
      eachAlcohol.speed = 4
    })
    vasosDeAguaArr.forEach((eachVasoDeAgua) => {
      eachVasoDeAgua.speed = 4
    })
  } else if (scoreNode.innerText >= 20){
    alcoholArr.forEach((eachAlcohol) => {
      eachAlcohol.speed = 6
    })
    vasosDeAguaArr.forEach((eachVasoDeAgua) => {
      eachVasoDeAgua.speed = 6
    })
  } 
}

function bonusAppear() {
  let randomPositionX = Math.floor(Math.random() * gameBoxNode.offsetWidth);

  bonusObj = new Bonus(randomPositionX);
  bonusArr.push(bonusObj);
}

function colisionBonusConPersona() {
  bonusArr.forEach((eachBonus, index) => {
    if (
      eachBonus.x < personaObj.x + personaObj.w &&
      eachBonus.x + personaObj.w > personaObj.x &&
      eachBonus.y < personaObj.y + personaObj.h &&
      eachBonus.y + personaObj.h > personaObj.y
    ) {
      bonusArr.splice(index, 1);
      eachBonus.node.remove();
      personaObj.movementSpeed = 60
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
- gameOver()✅
*/
