import { Player } from "../player";
import { Weapon } from "../weapon";
import { Pistol } from "../weapon/pistol";

export class Scout extends Player {
  protected absoluteSpeed: number = 350;
  protected radius: number = 20;
  protected maxHealth = 150;
  protected primaryColor: string = "#558800";
  protected secondaryColor: string = "#335500";

  public health = this.maxHealth;
  public weapon: Weapon = new Pistol(this);

  public render() {
    this.translateToRelative();
    this.context.strokeStyle = "#000000";
    this.context.fillStyle = this.secondaryColor;
    this.context.beginPath();
    this.context.arc(-this.radius + 5, 0, this.radius - 6, 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();
    this.translateToAbsolute();

    super.render();
  }
}
