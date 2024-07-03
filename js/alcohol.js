class Alcohol {
  constructor(randomPositionX, alcoholImg) {
    this.node = document.createElement("img");
    if (alcoholImg === "white") {
      this.node.src = "./images/wine-white.png";
    } else if (alcoholImg === "red"){
      this.node.src = "./images/wine-red.png";
    } else if (alcoholImg === "cocktail"){
      this.node.src = "./images/cocktail.png"
    }

    gameBoxNode.append(this.node);

    this.x = randomPositionX;
    this.y = -60;
    this.w = 80;
    this.h = 80;

    // configuración inicial del elemento
    this.node.style.position = "absolute"; // se tiene que indicar posición absoluto para poder usar las posiciones de top y left
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    this.speed = 2;
  }

  // aquí estaran los metodos de persona
  automaticMovementAlcohol() {
    this.y += this.speed;
    this.node.style.top = `${this.y}px`;
  }
}
