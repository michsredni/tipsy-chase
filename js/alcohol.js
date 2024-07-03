class Alcohol {
  constructor(randomPositionX, type) {
    this.node = document.createElement("img");
    if (type === "red") {
      this.node.src = "./images/wine-red.png";
    } else if (type === "white") {
      this.node.src = "./images/wine-white.png";
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
