import { Point } from "../../utils/point";

import { state } from "../../state";
import { background, ui } from "../../layers";

import { Stage } from "../stage";
import { Player } from "../characters/player";
import { Projectile } from "../characters/projectile";
import { Zombie } from "../characters/zombie";
import { CommonZombie } from "../characters/zombies/common";
import { HulkZombie } from "../characters/zombies/hulk";
import { RunnerZombie } from "../characters/zombies/runner";
import { BoomerZombie } from "../characters/zombies/boomer";

import { ScoreScreenStage } from "./score-screen";

export interface IGameStageState {
  player: Player;
  zombies: Zombie[];
  score: number;
}

export class GameStage extends Stage {
  protected eventListeners = [
    { type: "keydown", callback: (event: KeyboardEvent) => state.player.handleKeyDown(event) },
    { type: "keyup", callback: (event: KeyboardEvent) => state.player.handleKeyUp(event) },
    { type: "pointerdown", callback: (event: MouseEvent) => state.player.handleMouseDown(event) },
    { type: "pointerup", callback: (event: MouseEvent) => state.player.handleMouseUp(event) }
  ];

  constructor() {
    super();
    state.player.showHealth = true;
    state.zombies = [];
    state.score = 0;
  }

  public next(dt: number) {
    this.createZombies(dt);
    state.player.next(dt);

    for (const zombie of state.zombies) {
      zombie.setFacing(state.player.coords);
      zombie.next(dt);

      if (zombie.collidesWith(state.player)) {
        state.player.health -= zombie.damage;
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

    state.player.render();

    // ! Score
    ui.setFont(25, "#ffffff", "left");
    ui.drawText(Point.fromPercentage(2, 5), `SCORE: ${state.score.toString()}`);

    // ! Ammo
    const ammoLabel = `${state.player.weapon.ammo}/${state.player.weapon.maxAmmo}`;
    ui.setFont(25, state.player.weapon.isReloading ? "#ff0000" : "ffffff", "right");
    ui.drawText(Point.fromPercentage(98, 95), ammoLabel);
  }

  protected createZombies(dt: number) {
    const zombieTypes = [CommonZombie, HulkZombie, RunnerZombie, BoomerZombie];

    for (const ZombieType of zombieTypes) {
      if (Math.random() < ZombieType.spawnRate * dt) {
        const newZombie = new ZombieType();

        newZombie.setCoords();
        newZombie.setFacing(state.player.coords);

        state.zombies.push(newZombie);
      }
    }
  }

  protected destroyZombie(zombie: Zombie) {
    const index = state.zombies.indexOf(zombie);
    state.zombies.splice(index, 1);
    state.score += zombie.scoreValue;
  }

  protected destroyProjectile(projectile: Projectile) {
    const index = state.player.projectiles.indexOf(projectile);
    state.player.projectiles.splice(index, 1);
  }
}
