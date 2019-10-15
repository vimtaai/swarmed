import { Zombie } from "../zombie";

export class CommonZombie extends Zombie {
  protected absoluteSpeed: number = 50;
  protected radius: number = 20;

  public secondaryColor: string = "#888888";
  public primaryColor: string = "#666666";

  public damage: number = 10;
}
