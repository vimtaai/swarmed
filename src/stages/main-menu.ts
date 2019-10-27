import { Point } from "../classes/point";
import { Stage } from "../classes/stage";
import { Layer } from "../classes/layer";

import { Player } from "../entities/characters/player";
import { Scout } from "../entities/characters/players/scout";
import { Soldier } from "../entities/characters/players/soldier";
import { Heavy } from "../entities/characters/players/heavy";
import { PlayerSelector } from "../entities/ui-elements/player-selector";

import { GameStage } from "../stages/game";

import { state } from "../state";

export class MainMenuStage extends Stage {
  protected layers = {
    main: new Layer()
  };
  protected eventListeners = {
    pointerdown: (e: MouseEvent) => this.handleClick(e)
  };
  protected uiElements = [];
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
    this.layers.main.fill("#000000");
    this.layers.main.setFont(60, "#55aa33");
    this.layers.main.drawText(Point.fromPercentage(50, 10), "SWARMED!");

    for (const uiElement of this.uiElements) {
      uiElement.render(this.layers.main);
    }

    this.layers.main.setFont(30, "#ffffff", "center");
    this.layers.main.drawText(Point.fromPercentage(50, 85), "SELECT A HERO TO START");
  }

  protected handleClick(event: MouseEvent) {
    for (const uiElement of this.uiElements) {
      if (!(uiElement instanceof PlayerSelector)) {
        continue;
      }

      if (uiElement.isHovered) {
        state.player = uiElement.player;
        state.setStage(new GameStage());
      }
    }
  }
}
