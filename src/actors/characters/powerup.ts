import { Point } from "../../utils/point";

import { Character } from "../character";
import { Player } from "./player";
import { Zombie } from "./zombie";

export abstract class Powerup extends Character {
  public static dropRate = 0;

  protected showHealth = false;

  public maxHealth = 0;

  abstract activate(player: Player);

  constructor(zombie: Zombie) {
    super();
    this.coords = Point.clone(zombie.coords);
  }
}
