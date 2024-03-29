import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";

import { Character } from "../../entities/character";
import { Zombie } from "./zombie";
import { Player } from "./player";

import { state } from "../../state";

export abstract class Projectile extends Character {
  public abstract damage: number;
  public maxHealth = 0;
  public targets: Set<Character>;
  public showHealth = false;
  protected abstract trailLength: number;

  public get speed(): Point {
    return new Point(Math.cos(this.facing) * this.moveSpeed, Math.sin(this.facing) * this.moveSpeed);
  }

  constructor(character: Character) {
    super();
    this.coords = Point.clone(character.coords);

    if (character instanceof Zombie) {
      this.targets = state.players;
    } else if (character instanceof Player) {
      this.targets = state.zombies;
    }
  }

  public render(layer: Layer) {
    this.renderTrail(layer);
    super.render(layer);
  }

  protected renderTrail(layer: Layer) {
    layer.setStroke(this.secondaryColor, 2 * this.radius);
    layer.drawLine(new Point(0, 0), new Point(-this.trailLength, 0));
  }
}
