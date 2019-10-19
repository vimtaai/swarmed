import { Point } from "../classes/point";
import { Layer } from "../classes/layer";
import { Actor } from "../types/renderable/actor";

import { foreground } from "../layers";

export abstract class Character extends Actor {
  public abstract name: string;
  public abstract description: string;
  public abstract moveSpeed: number;
  public abstract radius: number;
  public abstract maxHealth: number;
  public health: number;

  protected abstract primaryColor: string;
  protected abstract secondaryColor: string;
  protected abstract showHealth: boolean;
  protected layer: Layer = foreground;

  public get percentHealth(): number {
    return this.health / this.maxHealth;
  }

  public render() {
    this.translateToRelative();
    this.rotateToRelative();

    this.layer.setStroke("#000000");
    this.layer.setFill(this.primaryColor);
    this.layer.drawArc(new Point(0, 0), this.radius);

    this.rotateToAbsolute();
    this.translateToAbsolute();
  }

  public collidesWith(actor: Character) {
    return this.coords.distanceTo(actor.coords) < this.radius + actor.radius;
  }
}
