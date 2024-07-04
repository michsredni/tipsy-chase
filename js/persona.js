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
    this.vidas = 3
    this.imageNumber = 1
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

  changeImage(){
    if(this.imageNumber === 1){
      this.imageNumber = 2
      this.node.src = "./images/character_femalePerson_walk2.png"
    } else if(this.imageNumber === 2){
      this.imageNumber = 3
      this.node.src = "./images/character_femalePerson_walk3.png"
    } else if(this.imageNumber === 3){
       this.imageNumber = 4
      this.node.src = "./images/character_femalePerson_walk4.png"
    } else if(this.imageNumber === 4){
      this.imageNumber = 1
      this.node.src = "./images/character_femalePerson_walk1.png"
    }
  }

}
