import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";
import { EventListener } from "../../classes/event-listener";

import { HealthIndicator } from "../../ui-elements/health-indicator";
import { ReloadIndicator } from "../../ui-elements/reload-indicator";
import { ScoreIndicator } from "../../ui-elements/score-indicator";
import { AmmoIndicator } from "../../ui-elements/ammo-indicator";
import { CommonZombie } from "../characters/zombies/common";
import { HulkZombie } from "../characters/zombies/hulk";
import { RunnerZombie } from "../characters/zombies/runner";
import { BoomerZombie } from "../characters/zombies/boomer";
import { Heal } from "../characters/powerups/heal";
import { Shield } from "../characters/powerups/shield";
import { Stage } from "../stage";
import { ScoreScreenStage } from "./score-screen";

import { state } from "../../state";
import { background } from "../../layers";
import { Abberation } from "../characters/bosses/abberation";
import { BossIndicator } from "../../ui-elements/boss-indicator";

export class GameStage extends Stage {
  protected uiElements = [
    new HealthIndicator(),
    new ReloadIndicator(),
    new ScoreIndicator(),
    new AmmoIndicator(),
    new BossIndicator()
  ];
  protected eventListeners = [
    new EventListener("keydown", (e: KeyboardEvent) => this.handleKeyDown(e)),
    new EventListener("keyup", (e: KeyboardEvent) => this.handleKeyUp(e)),
    new EventListener("pointerdown", (e: MouseEvent) => this.handleMouseDown(e)),
    new EventListener("pointerup", (e: MouseEvent) => this.handleMouseUp(e))
  ];

  constructor() {
    super();
    state.player.showHealth = true;
    state.zombies = [];
    state.powerups = [];
    state.explosions = [];
    state.boss = null;
    state.score = 0;

    setTimeout(function() {
      state.boss = new Abberation();
      state.boss.spawn();
    }, 60000);
  }

  public next(dt: number) {
    this.createZombies(dt);
    state.player.next(dt);

    this.nextExplosions(dt);
    this.nextPowerups(dt);

    this.nextBoss(dt);
    this.nextZombies(dt);
  }

  public nextPowerups(dt: number) {
    for (const powerup of state.powerups) {
      if (powerup.collidesWith(state.player)) {
        powerup.activate(state.player);
        state.destroyPowerup(powerup);
      }
    }
  }

  public nextExplosions(dt: number) {
    for (const explosion of state.explosions) {
      explosion.next(dt);

      if (explosion.isFinished) {
        state.destroyExplosion(explosion);
      }
    }
  }

  public nextZombies(dt: number) {
    for (const zombie of state.zombies) {
      zombie.next(dt);

      if (zombie.collidesWith(state.player)) {
        state.player.sufferDamage(zombie.damage);
        state.destroyZombie(zombie);

        if (state.player.isDead) {
          state.setStage(ScoreScreenStage);
        }
        continue;
      }

      for (const projectile of state.player.projectiles) {
        if (projectile.collidesWith(zombie)) {
          zombie.sufferDamage(projectile.damage);
          state.player.destroyProjectile(projectile);
        }
      }

      if (zombie.isDead) {
        state.destroyZombie(zombie);
        this.createPowerups(zombie.coords);
        break;
      }
    }
  }

  public nextBoss(dt: number) {
    if (!state.boss) {
      return;
    }

    state.boss.next(dt);

    if (state.boss.collidesWith(state.player)) {
      state.player.sufferDamage(state.boss.damage);
      return;
    }

    for (const projectile of state.boss.projectiles) {
      if (projectile.collidesWith(state.player)) {
        state.player.sufferDamage(projectile.damage);
        state.boss.destroyProjectile(projectile);
      }
    }

    for (const projectile of state.player.projectiles) {
      if (projectile.collidesWith(state.boss)) {
        state.boss.sufferDamage(projectile.damage);
        state.player.destroyProjectile(projectile);
      }
    }

    if (state.boss.isDead) {
      state.boss = null;
    }
  }

  public render() {
    background.fill("#4dbd33");

    state.player.render();

    if (state.boss) {
      state.boss.render();
    }

    for (const zombie of state.zombies) {
      zombie.render();
    }

    for (const powerup of state.powerups) {
      powerup.render();
    }

    for (const explosion of state.explosions) {
      explosion.render();
    }

    for (const uiElement of this.uiElements) {
      uiElement.render();
    }
  }

  public createZombies(dt: number) {
    const zombieTypes = [CommonZombie, HulkZombie, RunnerZombie, BoomerZombie];

    for (const ZombieType of zombieTypes) {
      if (Math.random() < ZombieType.spawnRate * dt) {
        const newZombie = new ZombieType();

        newZombie.spawn();
        newZombie.face(state.player.coords);

        state.zombies.push(newZombie);
      }
    }
  }

  public createPowerups(point: Point) {
    const powerupTypes = [Heal, Shield];

    for (const PowerupType of powerupTypes) {
      if (Math.random() < PowerupType.dropRate) {
        const newPowerup = new PowerupType(point);

        state.powerups.push(newPowerup);
      }
    }
  }

  public handleKeyDown(event: KeyboardEvent) {
    if (event.code === "KeyW") {
      state.player.speed.y = -Layer.toPixels(state.player.moveSpeed);
    } else if (event.code === "KeyS") {
      state.player.speed.y = Layer.toPixels(state.player.moveSpeed);
    } else if (event.code === "KeyA") {
      state.player.speed.x = -Layer.toPixels(state.player.moveSpeed);
    } else if (event.code === "KeyD") {
      state.player.speed.x = Layer.toPixels(state.player.moveSpeed);
    } else if (event.code === "KeyR") {
      state.player.weapon.reload();
    }
  }

  protected handleKeyUp(event: KeyboardEvent) {
    if (event.code === "KeyW") {
      if (state.player.speed.y < 0) state.player.speed.y = 0;
    } else if (event.code === "KeyS") {
      if (state.player.speed.y > 0) state.player.speed.y = 0;
    } else if (event.code === "KeyA") {
      if (state.player.speed.x < 0) state.player.speed.x = 0;
    } else if (event.code === "KeyD") {
      if (state.player.speed.x > 0) state.player.speed.x = 0;
    }
  }

  public handleMouseDown(event: MouseEvent) {
    state.player.weapon.fire();
    state.player.weapon.isFiring = true;
  }

  public handleMouseUp(event: MouseEvent) {
    state.player.weapon.isFiring = false;
  }
}
