import { Point } from "../../../utils/point";

import { Player } from "../player";
import { Pistol } from "../../weapons/pistol";

export class Scout extends Player {
  protected primaryColor = "#558800";
  protected secondaryColor = "#335500";

  public name = "SCOUT";
  public description = "THE NIMBLE";
  public radius = 15;
  public moveSpeed = 150;
  public maxHealth = 150;
  public weapon = new Pistol(this);

  public health = this.maxHealth;

  public draw() {
    // ! Backpack
    this.layer.setStroke("#000000");
    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(-this.radius * 0.6, 0), this.radius * 0.8);

    super.draw();
  }
}
