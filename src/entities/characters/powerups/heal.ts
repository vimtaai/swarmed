import { Point } from "../../../classes/point";
import { Layer } from "../../../classes/layer";

import { Powerup } from "../../../entities/characters/powerup";
import { Player } from "../../../entities/characters/player";

export class Heal extends Powerup {
  public static dropRate = 0.05;

  public name = "HEAL";
  public description = "GIVES YOU BACK 50 HP";
  public moveSpeed = 0;
  public radius = 18;
  public primaryColor = "#20a473";
  public secondaryColor = "#ffffff";
  protected healAmount = 50;

  public pickup(player: Player) {
    this.activate(player);
  }

  public activate(player: Player) {
    player.recieveHeal(this.healAmount);
  }

  public render(layer: Layer) {
    super.render(layer);

    layer.setStroke("transparent");
    layer.setFill(this.secondaryColor);
    layer.drawArc(new Point(0, 0), this.radius - 4);
    layer.setFill(this.primaryColor);
    layer.drawRect(new Point(-this.radius / 2, -this.radius / 8), this.radius, this.radius / 4);
    layer.drawRect(new Point(-this.radius / 8, -this.radius / 2), this.radius / 4, this.radius);
  }
}
