class VasoAgua {
    constructor(randomPositionX) {
        this.node = document.createElement("img");
        this.node.src = "./images/glass.png"
        gameBoxNode.append(this.node);
    
        this.x = randomPositionX
        this.y = -60
        this.w = 60;
        this.h = 60;
    
        // configuración inicial del elemento
        this.node.style.position = "absolute"; // se tiene que indicar posición absoluto para poder usar las posiciones de top y left
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;
        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;
    
        this.speed = 2;
      }
    
      // aquí estaran los metodos de persona
      automaticMovement() {
        this.y += this.speed;
        this.node.style.top = `${this.y}px`;
      }
    
}