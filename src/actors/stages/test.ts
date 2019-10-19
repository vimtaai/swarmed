import { Point } from "../../classes/point";
import { EventListener } from "../../classes/event-listener";

import { Actor } from "../../types/renderable/actor";
import { Scout } from "../characters/players/scout";
import { Soldier } from "../characters/players/soldier";
import { Heavy } from "../characters/players/heavy";
import { Player } from "../characters/player";
import { Heal } from "../characters/powerups/heal";
import { Stage } from "../stage";
import { MainMenuStage } from "./main-menu";

import { state } from "../../state";
import { foreground, background } from "../../layers";
import { CommonZombie } from "../characters/zombies/common";
import { HulkZombie } from "../characters/zombies/hulk";
import { RunnerZombie } from "../characters/zombies/runner";
import { BoomerZombie } from "../characters/zombies/boomer";

export class TestStage extends Stage {
  protected uiElements = [];
  protected eventListeners = [new EventListener("keydown", (e: KeyboardEvent) => this.handleKeyDown(e))];
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

    this.actors = [scout, soldier, heavy, common, hulk, runner, boomer, heal];
  }

  public render() {
    background.fill("#ffffff");
    foreground.setFont(60, "#000000");
    foreground.drawText(Point.fromPercentage(50, 10), "TEST STAGE!");

    for (const uiElement of this.uiElements) {
      uiElement.render();
    }

    for (const actor of this.actors) {
      actor.render();
    }
  }

  protected handleKeyDown(event: KeyboardEvent) {
    if (event.code === "F10") {
      event.preventDefault();
      state.setStage(MainMenuStage);
    }
  }
}
