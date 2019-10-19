import { Point } from "../../classes/point";
import { EventListener } from "../../classes/event-listener";

import { PlayerSelector } from "../../ui-elements/player-selector";
import { Scout } from "../characters/players/scout";
import { Soldier } from "../characters/players/soldier";
import { Heavy } from "../characters/players/heavy";
import { Player } from "../characters/player";
import { Stage } from "../stage";
import { GameStage } from "./game";

import { state } from "../../state";
import { foreground, background, ui } from "../../layers";

export class MainMenuStage extends Stage {
  protected uiElements = [];
  protected eventListeners = [new EventListener("pointerdown", (e: MouseEvent) => this.handleClick(e))];
  protected playerOptions: Player[] = [new Scout(), new Soldier(), new Heavy()];
  protected selectedPlayerOption: Player;

  public constructor() {
    super();

    const selectionStart = Point.fromPercentage(50, 34);
    for (const playerOption of this.playerOptions) {
      const playerOptionIndex = this.playerOptions.indexOf(playerOption);
      const playerSelectorCoords = selectionStart.shiftY(playerOptionIndex * PlayerSelector.height);
      this.uiElements.push(new PlayerSelector(playerOption, playerSelectorCoords));
    }
  }

  public render() {
    background.fill("#000000");
    foreground.setFont(60, "#55aa33");
    foreground.drawText(Point.fromPercentage(50, 10), "SWARMED!");

    for (const uiElement of this.uiElements) {
      uiElement.render();
    }

    foreground.setFont(30, "#ffffff", "center");
    foreground.drawText(Point.fromPercentage(50, 85), "SELECT A HERO TO START");
  }

  protected handleClick(event: MouseEvent) {
    for (const uiElement of this.uiElements) {
      if (!(uiElement instanceof PlayerSelector)) {
        continue;
      }

      if (uiElement.isHovered) {
        state.player = uiElement.player;
        state.setStage(GameStage);
      }
    }
  }
}
