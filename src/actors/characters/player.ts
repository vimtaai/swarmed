import { Point } from "../../utils/point";
import { Layer } from "../../utils/layer";

import { state } from "../../state";

import { Character } from "../character";
import { Weapon } from "../weapon";
import { Projectile } from "./projectile";

export abstract class Player extends Character {
  public abstract weapon: Weapon;
  public showHealth = true;
  public speed = new Point(0, 0);
  public facing = 0;
  public projectiles: Projectile[] = [];

  constructor(startingCoords: Point = new Point(50, 50)) {
    super();
    this.coords = startingCoords;
  }

  public next(dt: number) {
    this.setFacing(state.mousePosition);

    if (this.weapon.canAutoFire) {
      this.weapon.fire();
    }

    // ! Projectiles
    for (const projectile of this.projectiles) {
      projectile.next(dt);
    }

    const newCoords = this.coords.plus(this.speed.times(dt));
    if (!newCoords.outOfGameArea) {
      super.next(dt);
    }
  }

  public draw() {
    // ! Hands
    const baseHandPosition = new Point(this.radius, 0);
    const [leftHand, rightHand] = this.weapon.handOffsets;
    this.layer.setStroke("#000000");
    this.layer.setFill(this.primaryColor);
    this.layer.drawArc(baseHandPosition.plus(leftHand), this.radius * 0.4);
    this.layer.drawArc(baseHandPosition.plus(rightHand), this.radius * 0.4);

    this.withAbsoluteCoords(function() {
      // ! Projectiles
      for (const projectile of this.projectiles) {
        projectile.render();
      }

      // ! Reloading
      if (this.weapon.isReloading) {
        const timeElapsed = Date.now() - this.weapon.reloadStarted;
        const reloadProgressMaxWidth = 200;
        const reloadProgress = reloadProgressMaxWidth * (1 - timeElapsed / this.weapon.reloadTime);

        const reloadCoords = Point.fromPercentage(50, 80).shiftX(-reloadProgress / 2);
        this.layer.setFont(20, "#ff0000");
        this.layer.drawText(Point.fromPercentage(50, 85), "RELOADING");
        this.layer.setFill("#ff0000");
        this.layer.drawRect(reloadCoords, reloadProgress, 15);
      }
    });

    // ! Weapon
    this.weapon.draw();

    // ! Body
    super.draw();
  }

  public handleKeyDown(event: KeyboardEvent) {
    if (event.code === "KeyW") {
      this.speed.y = -Layer.toPixels(this.moveSpeed);
    } else if (event.code === "KeyS") {
      this.speed.y = Layer.toPixels(this.moveSpeed);
    } else if (event.code === "KeyA") {
      this.speed.x = -Layer.toPixels(this.moveSpeed);
    } else if (event.code === "KeyD") {
      this.speed.x = Layer.toPixels(this.moveSpeed);
    } else if (event.code === "KeyR") {
      this.weapon.reload();
    }
  }

  public handleKeyUp(event: KeyboardEvent) {
    if (event.code === "KeyW") {
      if (this.speed.y < 0) this.speed.y = 0;
    } else if (event.code === "KeyS") {
      if (this.speed.y > 0) this.speed.y = 0;
    } else if (event.code === "KeyA") {
      if (this.speed.x < 0) this.speed.x = 0;
    } else if (event.code === "KeyD") {
      if (this.speed.x > 0) this.speed.x = 0;
    }
  }

  public handleMouseDown(event: MouseEvent) {
    this.weapon.fire();
    this.weapon.isFiring = true;
  }

  public handleMouseUp(event: MouseEvent) {
    this.weapon.isFiring = false;
  }
}
