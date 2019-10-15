import { state } from "../state";
import { Stage } from "../stage";
import { layers } from "../layers";
import { Zombie } from "../actors/characters/zombie";
import { Player } from "../actors/characters/player";
import { CommonZombie } from "../actors/characters/zombies/common";
import { HulkZombie } from "../actors/characters/zombies/hulk";
import { Projectile } from "../actors/characters/projectile";

import { ScoreScreenStage } from "./score-screen";

export interface IGameStageState {
  player: Player;
  zombies: Zombie[];
}

export class GameStage extends Stage {
  protected zombieSpawnRate: number = 2;
  protected eventListeners = [
    { type: "keydown", callback: (event: KeyboardEvent) => state.player.handleKeyDown(event) },
    { type: "keyup", callback: (event: KeyboardEvent) => state.player.handleKeyUp(event) },
    { type: "pointermove", callback: (event: MouseEvent) => state.player.handleMouseMove(event) },
    { type: "pointerdown", callback: (event: MouseEvent) => state.player.handleClick(event) }
  ];

  public init() {
    state.zombies = [];
  }

  public next(dt: number) {
    this.createZombie(dt);
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
    layers.background.fill("#4dbd33");

    for (const zombie of state.zombies) {
      zombie.render();
    }

    state.player.render();
  }

  protected createZombie(dt: number) {
    if (Math.random() < this.zombieSpawnRate * dt) {
      let newZombie: Zombie;

      if (Math.random() < 0.1) {
        newZombie = new HulkZombie();
      } else {
        newZombie = new CommonZombie();
      }

      newZombie.setCoords();
      newZombie.setFacing(state.player.coords);

      state.zombies.push(newZombie);
    }
  }

  protected destroyZombie(zombie: Zombie) {
    const index = state.zombies.indexOf(zombie);
    state.zombies.splice(index, 1);
  }

  protected destroyProjectile(projectile: Projectile) {
    const index = state.player.projectiles.indexOf(projectile);
    state.player.projectiles.splice(index, 1);
    state.player.score++;
  }
}
