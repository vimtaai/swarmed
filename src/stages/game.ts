import { Soldier } from "../actors/actor/players/soldier";
import { Heavy } from "../actors/actor/players/heavy";
import { Scout } from "../actors/actor/players/scout";
import { state } from "../state";
import { foreground, background } from "../canvas";
import { Stage, StageType } from "../stage";
import { ScoreScreenStage } from "./score-screen";
import { fillBackground } from "../utils/context";

export const GameStage: Stage = {
  type: StageType.GAME,
  init() {
    state.zombies = [];
  },
  render() {
    fillBackground(background, "#4dbd33");

    for (const zombie of state.zombies) {
      zombie.render();
    }

    state.player.render();
  },
  next(dt: number) {
    state.createZombie(dt);
    state.player.next(dt);

    for (const zombie of state.zombies) {
      zombie.setFacing(state.player.coords);
      zombie.next(dt);

      if (zombie.collidesWith(state.player)) {
        state.player.health -= zombie.damage;
        state.destroyZombie(zombie);

        if (state.player.health === 0) {
          state.setStage(ScoreScreenStage);
        }
        continue;
      }

      for (const projectile of state.player.projectiles) {
        if (zombie.collidesWith(projectile)) {
          state.destroyZombie(zombie);
          state.destroyProjectile(projectile);
          break;
        }
      }
    }
  },
  listenForEvents() {
    addEventListener("keydown", function(event: KeyboardEvent) {
      if (!state && state.stage.type === StageType.GAME) {
        return;
      }
      state.player.handleKeyDown(event);
    });

    addEventListener("keyup", function(event: KeyboardEvent) {
      if (!state && state.stage.type === StageType.GAME) {
        return;
      }
      state.player.handleKeyUp(event);
    });

    addEventListener("pointermove", function(event: MouseEvent) {
      if (!state && state.stage.type === StageType.GAME) {
        return;
      }
      state.player.handleMouseMove(event);
    });

    addEventListener("pointerdown", function(event: MouseEvent) {
      if (!state && state.stage.type === StageType.GAME) {
        return;
      }
      state.player.handleClick(event);
    });
  }
};
