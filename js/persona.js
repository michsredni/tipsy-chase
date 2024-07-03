class Persona {
  constructor() {
    // aquí estaran todas las propiedades de cada persona
    this.node = document.createElement("img");
    this.node.src = "./images/character_femalePerson.png";
    gameBoxNode.append(this.node);

    this.x = gameBoxNode.offsetWidth / 2; // distancia entre la caja y el borde de la persona
    this.y = gameBoxNode.offsetHeight - 80
    this.w = 50;
    this.h = 80;

    // configuración inicial del elemento
    this.node.style.position = "absolute"; // se tiene que indicar posición absoluto para poder usar las posiciones de top y left
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    this.movementSpeed = 30
  }

  // aquí estaran los metodos de persona
  moveSides(position){
      if (position === "right" && (this.x + this.w) <= gameBoxNode.offsetWidth) {
        this.x += this.movementSpeed
        this.node.style.left = `${this.x}px`
      } else if (position === "left" && this.x >= 0){
        this.x -= this.movementSpeed
        this.node.style.left = `${this.x}px`
      }
  }
}
