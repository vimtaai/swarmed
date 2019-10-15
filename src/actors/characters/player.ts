import { Point } from "../../utils/point";
import { ActorWithHealth } from "../character";
import { Weapon } from "./weapon";
import { Projectile } from "./projectile";

export abstract class Player extends ActorWithHealth {
  protected moveSpeed: number = 200;

  public weapon: Weapon;
  public projectiles: Projectile[] = [];
  public score: number = 0;

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

  public render() {
    this.translateToRelative();

    // ! Hand
    this.layer.setFill(this.primaryColor);
    this.layer.drawArc(new Point(this.radius, 0), this.radius / 3);

    // ! Weapon
    this.weapon.render();

    this.layer.context.rotate(-this.facing);
    this.layer.context.translate(-this.coords.x, -this.coords.y);

    // ! Body
    super.render();

    // ! Projectiles
    for (const projectile of this.projectiles) {
      projectile.render();
    }

    // ! Score
    const scoreCoords = new Point(40, 40);
    this.layer.setFont(30, this.primaryColor, "left");
    this.layer.drawText(scoreCoords, `SCORE: ${this.score.toString()}`);

    // ! Ammo
    const ammoCoords = new Point(this.layer.width - 40, this.layer.height - 40);
    this.layer.setFont(30, this.weapon.isReloading ? "#ff0000" : this.weapon.primaryColor, "right");
    this.layer.drawText(ammoCoords, `${this.weapon.remainingAmmo}/${this.weapon.maxAmmo}`);

    if (this.weapon.isReloading) {
      const reloadingCoords = new Point(this.layer.width / 2, this.layer.height - 40);
      this.layer.setFont(30, "#ff0000", "center");
      this.layer.drawText(reloadingCoords, "RELOADING...");
    }
  }

  public handleKeyDown(event: KeyboardEvent) {
    if (event.code === "KeyW") {
      this.speed.y = -this.moveSpeed;
    } else if (event.code === "KeyS") {
      this.speed.y = this.moveSpeed;
    } else if (event.code === "KeyA") {
      this.speed.x = -this.moveSpeed;
    } else if (event.code === "KeyD") {
      this.speed.x = this.moveSpeed;
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
    const mouseCoords = new Point(event.offsetX, event.offsetY);

    this.setFacing(mouseCoords);
  }

  public handleClick(event: MouseEvent) {
    const mouseCoords = new Point(event.offsetX, event.offsetY);

    if (this.weapon.canFire) {
      const projectile = this.weapon.fire(mouseCoords);
      this.projectiles.push(projectile);
    }
  }
}
