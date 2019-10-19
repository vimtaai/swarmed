import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";

import { EventListener } from "../../classes/event-listener";
import { HealthIndicator } from "../../ui-elements/health-indicator";
import { ReloadIndicator } from "../../ui-elements/reload-indicator";
import { ScoreIndicator } from "../../ui-elements/score-indicator";
import { AmmoIndicator } from "../../ui-elements/ammo-indicator";
import { Player } from "../characters/player";
import { Projectile } from "../characters/projectile";
import { Zombie } from "../characters/zombie";
import { CommonZombie } from "../characters/zombies/common";
import { HulkZombie } from "../characters/zombies/hulk";
import { RunnerZombie } from "../characters/zombies/runner";
import { BoomerZombie } from "../characters/zombies/boomer";
import { Powerup } from "../characters/powerup";
import { Heal } from "../characters/powerups/heal";
import { Shield } from "../characters/powerups/shield";
import { Stage } from "../stage";
import { ScoreScreenStage } from "./score-screen";

import { state } from "../../state";
import { background } from "../../layers";

export interface IGameStageState {
  player: Player;
  zombies: Zombie[];
  powerups: Powerup[];
  score: number;
}

export class GameStage extends Stage {
  protected uiElements = [new HealthIndicator(), new ReloadIndicator(), new ScoreIndicator(), new AmmoIndicator()];
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
    state.score = 0;
  }

  public next(dt: number) {
    this.createZombies(dt);
    state.player.next(dt);

    for (const projectile of state.player.projectiles) {
      if (projectile.coords.outOfGameArea) {
        this.destroyProjectile(projectile);
      }
    }

    for (const powerup of state.powerups) {
      if (powerup.collidesWith(state.player)) {
        powerup.activate(state.player);
        this.destroyPowerup(powerup);
      }
    }

    for (const zombie of state.zombies) {
      zombie.face(state.player.coords);
      zombie.next(dt);

      if (zombie.collidesWith(state.player)) {
        let damage: number = zombie.damage;

        if (state.player.shield > 0) {
          const damageToHealth = Math.max(damage - state.player.shield, 0);
          state.player.shield = Math.max(state.player.shield - damage, 0);
          damage = damageToHealth;
        }

        state.player.health -= damage;
        this.destroyZombie(zombie);

        if (state.player.health <= 0) {
          state.setStage(ScoreScreenStage);
        }
        continue;
      }

      for (const projectile of state.player.projectiles) {
        if (zombie.collidesWith(projectile)) {
          zombie.health -= projectile.damage;
          this.destroyProjectile(projectile);

          if (zombie.health <= 0) {
            this.destroyZombie(zombie);
            this.createPowerups(zombie.coords);
            break;
          }
        }
      }
    }
  }

  public render() {
    background.fill("#4dbd33");

    for (const zombie of state.zombies) {
      zombie.render();
    }

    for (const powerup of state.powerups) {
      powerup.render();
    }

    state.player.render();

    for (const uiElement of this.uiElements) {
      uiElement.render();
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

  protected createZombies(dt: number) {
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

  protected createPowerups(point: Point) {
    const powerupTypes = [Heal, Shield];

    for (const PowerupType of powerupTypes) {
      if (Math.random() < PowerupType.dropRate) {
        const newPowerup = new PowerupType(point);

        state.powerups.push(newPowerup);
      }
    }
  }

  protected destroyZombie(zombie: Zombie) {
    const index = state.zombies.indexOf(zombie);
    state.zombies.splice(index, 1);
    state.score += zombie.scoreValue;
  }

  protected destroyPowerup(powerup: Powerup) {
    const index = state.powerups.indexOf(powerup);
    state.powerups.splice(index, 1);
  }

  protected destroyProjectile(projectile: Projectile) {
    const index = state.player.projectiles.indexOf(projectile);
    state.player.projectiles.splice(index, 1);
  }
}
