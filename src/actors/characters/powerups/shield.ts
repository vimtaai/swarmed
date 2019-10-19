import { Point } from "../../../classes/point";

import { Powerup } from "../powerup";
import { Player } from "../player";

export class Shield extends Powerup {
  public static dropRate = 0.02;
  public name = "SHIELD";
  public description = "GIVES YOU 100 SHIELD";
  public moveSpeed = 0;
  public radius = 18;
  protected primaryColor = "#2073a4";
  protected secondaryColor = "#ffffff";

  public activate(player: Player) {
    const shieldAmount = 100;
    player.shield = shieldAmount;
  }

  public render() {
    super.render();

    this.translateToRelative();

    this.layer.setStroke("transparent", 0);
    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(0, 0), this.radius - 4);
    this.layer.setFill(this.primaryColor);
    this.layer.drawPolygon(new Point(-8, -8), new Point(8, -8), new Point(8, 4), new Point(0, 10), new Point(-8, 4));
    this.layer.setFill("rgba(0, 0, 0, 0.2)");
    this.layer.drawPolygon(new Point(-8, -8), new Point(0, -8), new Point(0, 10), new Point(-8, 4));

    this.translateToAbsolute();
  }
}
