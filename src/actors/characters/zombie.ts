import { randomBetween } from "../../utils/random";
import { Point } from "../../classes/point";
import { Character } from "../character";
import { percentageToColor } from "../../utils/color";

import { state } from "../../state";

export abstract class Zombie extends Character {
  public static spawnRate: number;

  public abstract damage: number;
  public abstract scoreValue: number;

  public get speed(): Point {
    const xSpeed = this.moveSpeed * Math.cos(this.facing);
    const ySpeed = this.moveSpeed * Math.sin(this.facing);
    return new Point(xSpeed, ySpeed);
  }

  public next(dt: number) {
    this.face(state.player.coords);
    super.next(dt);
  }

  public render() {
    this.renderHands();
    super.render();
    this.renderHealth();
  }

  public renderHands() {
    this.translateToRelative();
    this.rotateToRelative();

    this.layer.setStroke(this.outlineColor);
    this.layer.setFill(this.secondaryColor);
    this.layer.drawArc(new Point(this.radius * 0.8, -this.radius * 0.8), this.radius * 0.3);
    this.layer.drawArc(new Point(this.radius * 0.8, this.radius * 0.8), this.radius * 0.3);

    this.rotateToAbsolute();
    this.translateToAbsolute();
  }

  public renderHealth() {
    if (!this.showHealth) {
      return;
    }

    const healthMaxWidth = this.maxHealth / 5;
    const healthPercentage = this.health / this.maxHealth;
    const healthWidth = Math.max(healthMaxWidth * healthPercentage, 0);

    this.layer.setStroke("#000000");
    this.layer.setFill(percentageToColor(healthPercentage));

    this.translateToRelative();

    this.layer.drawRect(new Point(-healthWidth / 2, -this.radius * 2), healthWidth, 7);

    this.translateToAbsolute();
  }

  public spawn() {
    const side = randomBetween(1, 4);

    if (side === 1) {
      // ! top
      this.coords = Point.fromPercentage(randomBetween(0, 100), 0).shiftY(-this.radius);
    } else if (side === 2) {
      // ! right
      this.coords = Point.fromPercentage(100, randomBetween(0, 100)).shiftX(this.radius);
    } else if (side === 3) {
      // ! bottom
      this.coords = Point.fromPercentage(randomBetween(0, 100), 100).shiftY(this.radius);
    } else if (side === 4) {
      // ! left
      this.coords = Point.fromPercentage(0, randomBetween(0, 100)).shiftX(-this.radius);
    }
  }
}
