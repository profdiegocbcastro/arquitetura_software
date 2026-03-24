import { TreeType } from "../flyweights/tree-type";

export class TreeTypeFactory {
  private readonly treeTypes = new Map<string, TreeType>();

  getTreeType(
    species: string,
    trunkColor: string,
    texture: string,
  ): TreeType {
    const key = `${species}:${trunkColor}:${texture}`;

    if (!this.treeTypes.has(key)) {
      console.log(`[Factory] Criando flyweight para ${key}.`);
      this.treeTypes.set(key, new TreeType(species, trunkColor, texture));
    }

    return this.treeTypes.get(key)!;
  }

  count(): number {
    return this.treeTypes.size;
  }
}
