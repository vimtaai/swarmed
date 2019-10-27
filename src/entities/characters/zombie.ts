import { percentageToColor } from "../../utils/color";
import { randomBetween } from "../../utils/random";

import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";

import { Character } from "../../entities/character";
import { Player } from "../../entities/characters/player";

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
    this.faceClosestPlayer();
    super.next(dt);
  }

  public render(layer: Layer) {
    this.renderHands(layer);
    super.render(layer);
    this.renderHealth(layer);
  }

  public faceClosestPlayer() {
    let closestPlayer: Player;
    let smallestDistance = Infinity;

    state.player.forEach(player => {
      const distance = this.coords.distanceTo(player.coords);

      if (this.coords.distanceTo(player.coords) < smallestDistance) {
        smallestDistance = distance;
        closestPlayer = player;
      }
    });

    this.face(closestPlayer.coords);
  }

  public renderHands(layer: Layer) {
    layer.setStroke(this.outlineColor);
    layer.setFill(this.secondaryColor);
    layer.drawArc(new Point(this.radius * 0.8, -this.radius * 0.8), this.radius * 0.3);
    layer.drawArc(new Point(this.radius * 0.8, this.radius * 0.8), this.radius * 0.3);
  }

  public renderHealth(layer: Layer) {
    if (!this.showHealth) {
      return;
    }

    const healthMaxWidth = this.maxHealth / 5;
    const healthPercentage = this.health / this.maxHealth;
    const healthWidth = Math.max(healthMaxWidth * healthPercentage, 0);

    layer.setStroke("#000000");
    layer.setFill(percentageToColor(healthPercentage));

    layer.withAbsoluteFacing(this.facing, () => {
      layer.drawRect(new Point(-healthWidth / 2, -this.radius * 2), healthWidth, 7);
    });
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
