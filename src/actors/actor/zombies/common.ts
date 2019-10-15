import { Zombie } from "../zombie";

export class CommonZombie extends Zombie {
  protected absoluteSpeed: number = 50;
  protected radius: number = 20;
  protected secondaryColor: string = "#888888";
  protected primaryColor: string = "#666666";

  public damage: number = 10;

  constructor(context: CanvasRenderingContext2D) {
    super(context);
  }
}
