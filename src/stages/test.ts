import { Point } from "../classes/point";

import { Actor } from "../classes/actor";
import { Scout } from "../entities/characters/players/scout";
import { Soldier } from "../entities/characters/players/soldier";
import { Heavy } from "../entities/characters/players/heavy";
import { Player } from "../entities/characters/player";
import { Heal } from "../entities/characters/powerups/heal";
import { Stage } from "../classes/stage";
import { MainMenuStage } from "./main-menu";

import { state } from "../state";
import { CommonZombie } from "../entities/characters/zombies/common";
import { HulkZombie } from "../entities/characters/zombies/hulk";
import { RunnerZombie } from "../entities/characters/zombies/runner";
import { BoomerZombie } from "../entities/characters/zombies/boomer";
import { Shield } from "../entities/characters/powerups/shield";
import { Abberation } from "../entities/characters/bosses/abberation";
import { Layer } from "../classes/layer";

export class TestStage extends Stage {
  protected layers = {
    main: new Layer()
  };
  protected eventListeners = {
    keydown: (e: KeyboardEvent) => this.handleKeyDown(e)
  };

  protected actors: Actor[] = [];
  protected selectedPlayerOption: Player;

  public constructor() {
    super();
    const scout = new Scout();
    scout.coords = new Point(100, 250);
    const soldier = new Soldier();
    soldier.coords = new Point(100, 350);
    const heavy = new Heavy();
    heavy.coords = new Point(100, 450);
    const common = new CommonZombie();
    common.coords = new Point(300, 250);
    const hulk = new HulkZombie();
    hulk.coords = new Point(300, 350);
    const runner = new RunnerZombie();
    runner.coords = new Point(300, 450);
    const boomer = new BoomerZombie();
    boomer.coords = new Point(300, 550);
    const heal = new Heal(new Point(500, 250));
    const shield = new Shield(new Point(500, 350));
    const abberation = new Abberation();
    abberation.coords = new Point(700, 250);

    this.actors = [scout, soldier, heavy, common, hulk, runner, boomer, heal, shield, abberation];
  }

  public render() {
    this.layers.main.fill("#ffffff");
    this.layers.main.setFont(60, "#000000");
    this.layers.main.drawText(Point.fromPercentage(50, 10), "TEST STAGE!");

    for (const actor of this.actors) {
      actor.renderRelative(this.layers.main);
    }
  }

  protected handleKeyDown(event: KeyboardEvent) {
    if (event.code === "F10") {
      event.preventDefault();
      state.setStage(new MainMenuStage());
    }
  }
}
