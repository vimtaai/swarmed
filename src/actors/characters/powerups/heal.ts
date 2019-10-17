import { Point } from "../../../utils/point";

import { Powerup } from "../powerup";
import { Player } from "../player";

export class Heal extends Powerup {
  public static dropRate = 0.1;

  protected primaryColor = "#20a473";
  protected secondaryColor = "#ffffff";

  public name = "HEAL";
  public description = "GIVES YOU BACK 50 HP";
  public moveSpeed = 0;
  public radius = 18;

  public activate(player: Player) {
    const healAmount = 50;

    player.health = Math.min(player.health + healAmount, player.maxHealth);
  }

  public draw() {
    super.draw();

    this.layer.setStroke("transparent");
    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(0, 0), this.radius - 4);
    this.layer.setFont(28, this.primaryColor);
    this.layer.drawText(new Point(0, 2), "+");
  }
}
