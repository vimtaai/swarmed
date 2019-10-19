import { Layer } from "../../classes/layer";
import { Point } from "../../classes/point";
import { Renderable } from "../renderable";
import { Nextable } from "../nextable";

export abstract class Actor implements Renderable, Nextable {
  public coords: Point;
  public speed: Point;
  public facing: number;
  protected abstract layer: Layer;

  abstract render(): void;

  public next(dt: number) {
    this.coords.x += this.speed.x * dt;
    this.coords.y += this.speed.y * dt;
  }

  public face(target: Point) {
    this.facing = this.coords.facingTo(target);
  }

  public translateToRelative() {
    this.layer.context.translate(this.coords.realX, this.coords.realY);
  }

  public translateToAbsolute() {
    this.layer.context.translate(-this.coords.realX, -this.coords.realY);
  }

  public rotateToRelative() {
    this.layer.context.rotate(this.facing);
  }

  public rotateToAbsolute() {
    this.layer.context.rotate(-this.facing);
  }
}
