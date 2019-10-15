import { Player } from "../player";
import { Weapon } from "../weapon";
import { Rifle } from "../weapon/rifle";

export class Heavy extends Player {
  protected absoluteSpeed: number = 150;
  protected radius: number = 30;
  protected maxHealth = 400;
  protected primaryColor: string = "#555588";
  protected secondaryColor: string = "#333355";

  public health = this.maxHealth;
  public weapon: Weapon = new Rifle(this);

  public render() {
    // ! Armor
    this.translateToRelative();
    this.context.strokeStyle = "#000000";
    this.context.fillStyle = this.secondaryColor;
    this.context.beginPath();
    this.context.arc(0, -this.radius + 10, 20, 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();
    this.context.beginPath();
    this.context.arc(0, this.radius - 10, 20, 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();
    this.context.beginPath();
    this.context.arc(10, 0, this.radius - 5, 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();

    // ! Second hand
    this.context.fillStyle = this.primaryColor;
    this.context.beginPath();
    this.context.arc(this.radius + 15, 0, this.radius / 3, 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();
    this.translateToAbsolute();

    super.render();
  }
}
