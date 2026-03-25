import { SavepointManager } from "./caretakers/savepoint-manager";
import { GameSession } from "./originators/game-session";

const game = new GameSession();
const savepoints = new SavepointManager();

game.advanceLevel();
game.addScore(150);
savepoints.save(game.createMemento());

game.advanceLevel();
game.addScore(300);
game.takeDamage(2);
console.log(`[Main] Estado atual: ${game.getStatus()}`);

const lastSavepoint = savepoints.getLast();

if (lastSavepoint) {
  game.restore(lastSavepoint);
}

console.log(`[Main] Estado restaurado: ${game.getStatus()}`);
