import { Player } from "./actors/actor/player";
import { Zombie } from "./actors/actor/zombie";
import { CommonZombie } from "./actors/actor/zombies/common";
import { Projectile } from "./actors/actor/projectile";

import { foreground } from "./canvas";
import { Stage } from "./stage";
import { HulkZombie } from "./actors/actor/zombies/hulk";

export class State {
  private zombieSpawnRate: number = 2;

  public selectedClass: number = 0;

  public stage: Stage;
  public player: Player;
  public zombies: Zombie[];

  public setStage(stage: Stage) {
    this.stage = stage;
    stage.init();
    stage.listenForEvents();
  }

  public createZombie(dt: number) {
    if (Math.random() < this.zombieSpawnRate * dt) {
      let newZombie: Zombie;
      if (Math.random() < 0.1) {
        newZombie = new HulkZombie(foreground);
      } else {
        newZombie = new CommonZombie(foreground);
      }
      newZombie.setCoords();
      newZombie.setFacing(this.player.coords);
      this.zombies.push(newZombie);
    }
  }

  public destroyZombie(zombie: Zombie) {
    const index = this.zombies.indexOf(zombie);
    this.zombies.splice(index, 1);
  }

  public destroyProjectile(projectile: Projectile) {
    const index = this.player.projectiles.indexOf(projectile);
    this.player.projectiles.splice(index, 1);
    this.player.score++;
  }
}

export const state = new State();
