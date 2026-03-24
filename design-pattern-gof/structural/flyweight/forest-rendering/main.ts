import { TreeTypeFactory } from "./factories/tree-type-factory";
import { ForestService } from "./services/forest-service";

const treeTypeFactory = new TreeTypeFactory();
const forestService = new ForestService(treeTypeFactory);

forestService.plantTree("Pinheiro", "marrom-escuro", "pine-texture", {
  x: 10,
  y: 20,
  scale: 1,
});
forestService.plantTree("Pinheiro", "marrom-escuro", "pine-texture", {
  x: 14,
  y: 25,
  scale: 1.1,
});
forestService.plantTree("Carvalho", "marrom-claro", "oak-texture", {
  x: 30,
  y: 18,
  scale: 1.4,
});
forestService.plantTree("Pinheiro", "marrom-escuro", "pine-texture", {
  x: 42,
  y: 12,
  scale: 0.95,
});

forestService.renderForest();
