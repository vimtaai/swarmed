import { Point } from "../../utils/point";
import { ActorWithHealth } from "../actor";
import { Weapon } from "./weapon";
import { Projectile } from "./projectile";

export abstract class Player extends ActorWithHealth {
  protected moveSpeed: number = 200;

  public weapon: Weapon;
  public projectiles: Projectile[] = [];
  public score: number = 0;

  constructor(context: CanvasRenderingContext2D) {
    super(context);
    this.coords = new Point(context.canvas.width / 2, context.canvas.height / 2);
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
    this.context.fillStyle = this.primaryColor;
    this.context.beginPath();
    this.context.arc(this.radius, 0, this.radius / 3, 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();

    // ! Weapon
    this.weapon.render();

    this.context.rotate(-this.facing);
    this.context.translate(-this.coords.x, -this.coords.y);

    // ! Body
    super.render();

    // ! Projectiles
    for (const projectile of this.projectiles) {
      projectile.render();
    }

    this.context.font = "30px 'Press Start 2P'";
    this.context.strokeStyle = "#000000";
    this.context.lineWidth = 2;
    this.context.textBaseline = "middle";

    // ! Score
    const scoreText = `SCORE: ${this.score.toString()}`;
    const scoreCoords = new Point(40, 40);
    this.context.textAlign = "left";
    this.context.fillStyle = this.primaryColor;
    this.context.fillText(scoreText, scoreCoords.x, scoreCoords.y);
    this.context.strokeText(scoreText, scoreCoords.x, scoreCoords.y);

    // ! Ammo
    const ammoText = `${this.weapon.remainingAmmo}/${this.weapon.maxAmmo}`;
    const ammoCoords = new Point(this.context.canvas.width - 40, this.context.canvas.height - 40);
    this.context.textAlign = "right";
    this.context.fillStyle = this.weapon.isReloading ? "#ff0000" : this.weapon.primaryColor;
    this.context.fillText(ammoText, ammoCoords.x, ammoCoords.y);
    this.context.strokeText(ammoText, ammoCoords.x, ammoCoords.y);

    if (this.weapon.isReloading) {
      const reloadingText = "Reloading...";
      const reloadingCoords = new Point(this.context.canvas.width / 2, this.context.canvas.height - 40);
      this.context.textAlign = "center";
      this.context.fillStyle = this.weapon.isReloading ? "#ff0000" : this.weapon.primaryColor;
      this.context.fillText(reloadingText, reloadingCoords.x, reloadingCoords.y);
      this.context.strokeText(reloadingText, reloadingCoords.x, reloadingCoords.y);
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
    const mouseCoords = new Point(event.pageX, event.pageY);

    this.setFacing(mouseCoords);
  }

  public handleClick(event: MouseEvent) {
    const mouseCoords = new Point(event.pageX, event.pageY);

    if (this.weapon.canFire) {
      const projectile = this.weapon.fire(mouseCoords);
      this.projectiles.push(projectile);
    }
  }
}
