class Rectangle {
  constructor(public width: number, public height: number) {}

  setDimensions(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(size: number) {
    super(size, size);
  }

  setDimensions(width: number, height: number): void {
    if (width !== height) {
      throw new Error("Para um quadrado, largura e altura devem ser iguais!");
    }
    super.setDimensions(width, height);
  }
}

function resizeRectangle(rectangle: Rectangle): void {
  rectangle.setDimensions(4, 5);
  console.log(`Área ajustada: ${rectangle.getArea()}`);
}

const rectangle = new Rectangle(2, 3);
const square = new Square(2);

resizeRectangle(rectangle);

// Falha para Square (quebra do LSP)
resizeRectangle(square); // Erro: "Para um quadrado, largura e altura devem ser iguais!"
