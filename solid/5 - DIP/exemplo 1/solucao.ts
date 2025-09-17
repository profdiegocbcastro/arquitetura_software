interface Category {
  name: string;
}

class DramaCategory implements Category {
  constructor(public name: string) {}
}

class Movie {
  constructor(private name: string, private category: Category) {}

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getCategory(): Category {
    return this.category;
  }

  setCategory(category: Category): void {
    this.category = category;
  }
}

const drama = new DramaCategory("Drama");
const movie = new Movie("O Poderoso Chefão", drama);

console.log("Filme:", movie.getName());
console.log("Categoria:", movie.getCategory().name);

movie.setName("O Poderoso Chefão II");
movie.setCategory(new DramaCategory("Drama Clássico"));

console.log("Filme atualizado:", movie.getName());
console.log("Categoria atualizada:", movie.getCategory().name);
