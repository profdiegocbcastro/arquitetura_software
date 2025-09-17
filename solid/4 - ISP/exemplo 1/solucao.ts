// Interface para filmes
interface Movie {
  play(): void;
}

// Interface para controle de áudio
interface AudioControl {
  increaseVolume(): void;
}

// TheLionKing implementa Movie e AudioControl
class TheLionKing implements Movie, AudioControl {
  play(): void {
    console.log("The Lion King está tocando!");
  }

  increaseVolume(): void {
    console.log("Volume aumentado em The Lion King");
  }
}

// ModernTimes implementa apenas Movie
class ModernTimes implements Movie {
  play(): void {
    console.log("Modern Times está tocando!");
  }
}

// --- Uso ---
const lionKing = new TheLionKing();
lionKing.play();
lionKing.increaseVolume();

const modernTimes = new ModernTimes();
modernTimes.play();
// modernTimes.increaseVolume(); // Erro de compilação: não existe
