import { Renderable } from "../interfaces/renderable";
import { Nextable } from "../interfaces/nextable";

import { Point } from "../classes/point";
import { Layer } from "../classes/layer";

export abstract class Actor implements Renderable, Nextable {
  public coords: Point;
  public speed: Point;
  public facing: number;

  abstract render(layer: Layer): void;

  public renderRelative(layer: Layer) {
    layer.withCenterAndFacing(this.coords, this.facing, () => this.render(layer));
  }

  public next(dt: number) {
    this.coords.x += this.speed.x * dt;
    this.coords.y += this.speed.y * dt;
  }

  public face(target: Point) {
    this.facing = this.coords.facingTo(target);
  }
}
