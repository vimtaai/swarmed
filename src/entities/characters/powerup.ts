import { Point } from "../../classes/point";

import { Character } from "../../entities/character";
import { Player } from "../../entities/characters/player";
import { InventoryIndicator } from "../../entities/ui-elements/inventory-indicator";

export abstract class Powerup extends Character {
  public static dropRate: number;

  public outlineColor = "#000000";
  public maxHealth = 0;
  public showHealth = false;

  constructor(point: Point) {
    super();
    this.coords = Point.clone(point);
  }

  public pickup(player: Player) {
    if (player.inventory === null) {
      player.inventory = this;
      this.coords = InventoryIndicator.coords;
    }
  }

  abstract activate(character: Character): void;
}
