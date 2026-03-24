import { TreeTypeFactory } from "../factories/tree-type-factory";
import { TreePosition } from "../types/tree-position";

type PlacedTree = {
  treeTypeKey: string;
  render: () => void;
};

export class ForestService {
  private readonly placedTrees: PlacedTree[] = [];

  constructor(private readonly treeTypeFactory: TreeTypeFactory) {}

  plantTree(
    species: string,
    trunkColor: string,
    texture: string,
    position: TreePosition,
  ): void {
    const treeType = this.treeTypeFactory.getTreeType(
      species,
      trunkColor,
      texture,
    );

    this.placedTrees.push({
      treeTypeKey: treeType.getKey(),
      render: () => treeType.render(position),
    });
  }

  renderForest(): void {
    this.placedTrees.forEach((tree) => tree.render());
    console.log(`Flyweights compartilhados: ${this.treeTypeFactory.count()}`);
    console.log(`Árvores posicionadas no mapa: ${this.placedTrees.length}`);
  }
}
