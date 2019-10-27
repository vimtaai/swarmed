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
  protected primaryColor = "#20a473";
  protected secondaryColor = "#ffffff";
  protected healAmount = 50;

  public activate(player: Player) {
    player.recieveHeal(this.healAmount);
  }

  public render(layer: Layer) {
    super.render(layer);

    this.translateToRelative(layer);

    layer.setStroke("transparent");
    layer.setFill(this.secondaryColor);
    layer.drawArc(new Point(0, 0), this.radius - 4);
    layer.setFill(this.primaryColor);
    layer.drawRect(new Point(-this.radius / 2, -this.radius / 8), this.radius, this.radius / 4);
    layer.drawRect(new Point(-this.radius / 8, -this.radius / 2), this.radius / 4, this.radius);

    this.translateToAbsolute(layer);
  }
}
