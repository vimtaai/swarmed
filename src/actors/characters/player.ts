import { Point } from "../../utils/point";
import { Character } from "../character";
import { Weapon } from "./weapon";
import { Projectile } from "./projectile";
import { canvas } from "../../canvas";

export abstract class Player extends Character {
  protected moveSpeed: number;

  public weapon: Weapon;
  public projectiles: Projectile[] = [];

  constructor() {
    super();

    this.coords = new Point(this.layer.width / 2, this.layer.height / 2);
    this.speed = new Point(0, 0);
  }

  public next(dt: number) {
    // ! Projectiles
    for (const projectile of this.projectiles) {
      projectile.next(dt);
    }

    super.next(dt);
  }

  public draw() {
    // ! Hands
    const baseHandPosition = new Point(this.radius, 0);
    const [leftHand, rightHand] = this.weapon.handOffsets;
    this.layer.setFill(this.primaryColor);
    this.layer.drawArc(Point.add(baseHandPosition, leftHand), this.radius / 3);
    this.layer.drawArc(Point.add(baseHandPosition, rightHand), this.radius / 3);

    this.withAbsoluteCoords(function() {
      // ! Projectiles
      for (const projectile of this.projectiles) {
        projectile.render();
      }

      // ! Reloading
      if (this.weapon.isReloading) {
        const reloadProgressMaxWidth = 20;
        const timeElapsed = Date.now() - this.weapon.reloadStarted;
        const reloadProgress = reloadProgressMaxWidth * (1 - timeElapsed / this.weapon.reloadTime);

        this.layer.setFont(2, "#ff0000");
        this.layer.drawText(new Point(50, 85), "RELOADING");
        this.layer.setFill("#ff0000");
        this.layer.drawRect(new Point(50 - reloadProgress / 2, 80), reloadProgress, 2);
      }
    });

    // ! Weapon
    this.weapon.draw();

    // ! Body
    super.draw();
  }

  public handleKeyDown(event: KeyboardEvent) {
    if (event.code === "KeyW") {
      this.speed.y = -canvas.toPixels(this.moveSpeed);
    } else if (event.code === "KeyS") {
      this.speed.y = canvas.toPixels(this.moveSpeed);
    } else if (event.code === "KeyA") {
      this.speed.x = -canvas.toPixels(this.moveSpeed);
    } else if (event.code === "KeyD") {
      this.speed.x = canvas.toPixels(this.moveSpeed);
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

  public handleMouseMove(event: MouseEvent) {
    const mouseCoords = new Point(canvas.fromPixels(event.offsetX), canvas.fromPixels(event.offsetY));

    this.setFacing(mouseCoords);
  }

  public handleClick(event: MouseEvent) {
    const mouseCoords = new Point(canvas.fromPixels(event.offsetX), canvas.fromPixels(event.offsetY));

    if (this.weapon.canFire) {
      const projectile = this.weapon.fire(mouseCoords);
      this.projectiles.push(projectile);
    }
  }
}
