import { Point } from "../../../classes/point";
import { Layer } from "../../../classes/layer";

import { Powerup } from "../../../entities/characters/powerup";
import { Player } from "../../../entities/characters/player";
import { LaserTurret } from "../../../entities/characters/turrets/laserturret";

import { state } from "../../../state";

export class AutoTurret extends Powerup {
  public static dropRate = 0.01;

  public name = "AUTO TURRET";
  public description = "SHOOTS ENEMIES WHEN PLACED DOWN";
  public moveSpeed = 0;
  public radius = 18;
  public primaryColor = "#d05050";
  public secondaryColor = "#300000";

  public activate(player: Player) {
    const turret = new LaserTurret();
    turret.coords = Point.clone(player.coords);
    state.players.add(turret);
    player.inventory = null;
  }

  public render(layer: Layer) {
    super.render(layer);

    layer.setStroke("transparent");
    layer.setFill(this.secondaryColor);
    layer.drawArc(new Point(0, 0), this.radius - 4);
    layer.setFill(this.primaryColor);
    // ? Barrel
    layer.drawRect(new Point(-this.radius * 0.5, -this.radius * 0.3), this.radius, this.radius / 4);
    layer.drawRect(new Point(-this.radius * 0.5, -this.radius * 0.25), this.radius * 1.1, this.radius * 0.15);
    // ? Foot
    layer.drawRect(new Point(-this.radius * 0.25, this.radius * 0.1), this.radius * 0.25, this.radius * 0.25);
    layer.drawRect(new Point(-this.radius * 0.5, this.radius * 0.3), this.radius * 0.9, this.radius * 0.1);
    // ? Body
    layer.drawRect(new Point(-this.radius * 0.4, -this.radius * 0.4), this.radius * 0.5, this.radius * 0.45);
    // ? Shade
    layer.setFill("rgba(0, 0, 0, 0.4)");
    layer.drawRect(new Point(-this.radius * 0.4, -this.radius * 0.4), this.radius * 0.5, this.radius * 0.45);
    layer.drawRect(new Point(-this.radius * 0.5, this.radius * 0.3), this.radius * 0.9, this.radius * 0.1);
  }
}
