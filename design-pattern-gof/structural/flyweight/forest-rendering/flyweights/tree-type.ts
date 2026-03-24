import { TreePosition } from "../types/tree-position";

export class TreeType {
  constructor(
    private readonly species: string,
    private readonly trunkColor: string,
    private readonly texture: string,
  ) {}

  render(position: TreePosition): void {
    console.log(
      `[Render] ${this.species} em (${position.x}, ${position.y}) com escala ${position.scale}, tronco ${this.trunkColor} e textura ${this.texture}.`,
    );
  }

  getKey(): string {
    return `${this.species}:${this.trunkColor}:${this.texture}`;
  }
}
