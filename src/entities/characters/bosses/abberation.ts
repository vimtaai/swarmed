import { Boss } from "../../../entities/characters/boss";
import { Weapon } from "../../../entities/weapon";
import { Spores } from "../../../entities/weapons/spores";

export class Abberation extends Boss {
  public damage: number = 20;
  public scoreValue: number = 200;
  public name: string = "ABBERATION";
  public description: string = "YOUR WORST NIGHTMARE";
  public moveSpeed: number = 30;
  public radius: number = 70;
  public maxHealth: number = 5000;
  public health = this.maxHealth;
  public weapon: Weapon = new Spores(this);
  public primaryColor: string = "#723453";
  public secondaryColor: string = "#612452";

  public constructor() {
    super();
    this.weapon.isFiring = true;
  }
}
