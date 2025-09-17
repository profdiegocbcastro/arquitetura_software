// Interface que define os métodos que todo Movie deve ter
interface Movie {
  play(): void;
  increaseVolume(): void;
}

// Implementação do TheLionKing
class TheLionKing implements Movie {
  play(): void {
    console.log("The Lion King está tocando!");
  }

  increaseVolume(): void {
    console.log("Volume aumentado em The Lion King");
  }
}

// Implementação do ModernTimes
class ModernTimes implements Movie {
  play(): void {
    console.log("Modern Times está tocando!");
  }

  increaseVolume(): void {
    // Esse método não será usado, mas precisa existir para cumprir a interface
    console.log("Método increaseVolume chamado em Modern Times (não usado)");
  }
}

// --- Uso ---
const lionKing = new TheLionKing();
lionKing.play();
lionKing.increaseVolume();

const modernTimes = new ModernTimes();
modernTimes.play();
modernTimes.increaseVolume();
