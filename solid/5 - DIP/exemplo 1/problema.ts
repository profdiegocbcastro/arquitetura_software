class DramaCategory {
    name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Movie {
  private name: string;
  private category: DramaCategory;

  constructor(name: string, categoryName: string) {
    this.name = name;
    this.category = new DramaCategory(categoryName); // sem injeção
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getCategory(): DramaCategory {
    return this.category;
  }

  setCategory(category: DramaCategory): void {
    this.category = category;
  }
}

const movie = new Movie("O Poderoso Chefão", "Drama");

console.log("Filme:", movie.getName());
console.log("Categoria:", movie.getCategory().name);

movie.setName("O Poderoso Chefão II");

console.log("Filme atualizado:", movie.getName());
console.log("Categoria atualizada:", movie.getCategory().name);
