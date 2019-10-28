import { randomBetween } from "../../utils/random";

import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";

import { Character } from "../../entities/character";

import { state } from "../../state";

export abstract class Zombie extends Character {
  public static spawnRate: number;

  public outlineColor = "#000000";
  public abstract damage: number;
  public abstract scoreValue: number;

  public get speed(): Point {
    const xSpeed = this.moveSpeed * Math.cos(this.facing);
    const ySpeed = this.moveSpeed * Math.sin(this.facing);
    return new Point(xSpeed, ySpeed);
  }

  public next(dt: number) {
    this.faceClosestPlayer();
    super.next(dt);
  }

  public render(layer: Layer) {
    this.renderHands(layer);
    super.render(layer);
  }

  public faceClosestPlayer() {
    this.face(this.closestCharacter(state.players).coords);
  }

  public renderHands(layer: Layer) {
    layer.setStroke(this.outlineColor);
    layer.setFill(this.secondaryColor);
    layer.drawArc(new Point(this.radius * 0.8, -this.radius * 0.8), this.radius * 0.3);
    layer.drawArc(new Point(this.radius * 0.8, this.radius * 0.8), this.radius * 0.3);
  }

  public spawn() {
    const side = randomBetween(1, 4);

    if (side === 1) {
      // ? top
      this.coords = Point.fromPercentage(randomBetween(0, 100), 0).shiftY(-this.radius);
    } else if (side === 2) {
      // ? right
      this.coords = Point.fromPercentage(100, randomBetween(0, 100)).shiftX(this.radius);
    } else if (side === 3) {
      // ? bottom
      this.coords = Point.fromPercentage(randomBetween(0, 100), 100).shiftY(this.radius);
    } else if (side === 4) {
      // ? left
      this.coords = Point.fromPercentage(0, randomBetween(0, 100)).shiftX(-this.radius);
    }
  }
}
