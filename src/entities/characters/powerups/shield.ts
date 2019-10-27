import { Point } from "../../../classes/point";
import { Layer } from "../../../classes/layer";

import { Powerup } from "../../../entities/characters/powerup";
import { Player } from "../../../entities/characters/player";

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

  public render(layer: Layer) {
    super.render(layer);

    layer.setStroke("transparent", 0);
    layer.setFill(this.secondaryColor);
    layer.drawArc(new Point(0, 0), this.radius - 4);
    layer.setFill(this.primaryColor);
    layer.drawPolygon(new Point(-8, -8), new Point(8, -8), new Point(8, 4), new Point(0, 10), new Point(-8, 4));
    layer.setFill("rgba(0, 0, 0, 0.2)");
    layer.drawPolygon(new Point(-8, -8), new Point(0, -8), new Point(0, 10), new Point(-8, 4));
  }
}
