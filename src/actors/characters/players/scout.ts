import { Point } from "../../../utils/point";

import { Player } from "../player";
import { Pistol } from "../weapon/pistol";

export class Scout extends Player {
  protected moveSpeed = 2;
  protected maxHealth = 150;

  public name = "SCOUT";
  public description = "THE NIMBLE";
  public primaryColor = "#558800";
  public secondaryColor = "#335500";

  public radius: number = 2;
  public health = this.maxHealth;
  public weapon = new Pistol(this);

  public draw() {
    // ! Backpack
    this.layer.setStroke(2, "#000000");
    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(-this.radius * 0.6, 0), this.radius * 0.8);

    super.draw();
  }
}
