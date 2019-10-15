import { Point } from "../../../utils/point";

import { Player } from "../player";
import { Weapon } from "../weapon";
import { Rifle } from "../weapon/rifle";

export class Heavy extends Player {
  protected absoluteSpeed: number = 150;
  protected radius: number = 30;
  protected maxHealth = 400;

  public name = "HEAVY";
  public description = "THE TOUGH";
  public primaryColor: string = "#555588";
  public secondaryColor: string = "#333355";

  public health = this.maxHealth;
  public weapon: Weapon = new Rifle(this);

  public render() {
    this.translateToRelative();

    // ! Armor
    this.layer.setStroke(2, "#000000");
    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(0, -this.radius + 10), 20);
    this.layer.drawArc(new Point(0, this.radius - 10), 20);
    this.layer.drawArc(new Point(10, 0), this.radius - 5);

    // ! Second hand
    this.layer.setFill(this.primaryColor);
    this.layer.drawArc(new Point(this.radius + 15, 0), this.radius / 3);

    this.translateToAbsolute();

    super.render();
  }
}
