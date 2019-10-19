import { Point } from "../../classes/point";

import { Character } from "../character";

export abstract class Powerup extends Character {
  public static dropRate: number;

  public maxHealth = 0;
  protected showHealth = false;

  abstract activate(character: Character): void;

  constructor(point: Point) {
    super();
    this.coords = Point.clone(point);
  }
}
