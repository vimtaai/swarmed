import { Stage, StageType } from "../stage";
import { fillBackground, drawText } from "../utils/context";
import { background, foreground } from "../canvas";
import { state } from "../state";
import { Scout } from "../actors/actor/players/scout";
import { Soldier } from "../actors/actor/players/soldier";
import { Heavy } from "../actors/actor/players/heavy";
import { GameStage } from "./game";

export const MainMenuStage: Stage = {
  type: StageType.MAIN_MENU,
  init() {},
  render() {
    fillBackground(background, "#000000");

    foreground.strokeStyle = "#000000";
    foreground.lineWidth = 2;
    foreground.textAlign = "center";
    foreground.textBaseline = "middle";

    foreground.font = "50px 'Press Start 2P'";
    foreground.fillStyle = "#55AA33";
    drawText(foreground, "ZOMBIES!!4!", foreground.canvas.width / 2, 100);

    foreground.font = "30px 'Press Start 2P'";
    foreground.fillStyle = "#ffffff";
    drawText(foreground, "SELECT YOUR HERO: ", foreground.canvas.width / 2, 300);

    const scout = new Scout(foreground);
    scout.coords.x += 100;
    scout.coords.y = 450;
    scout.render();
    foreground.font = "25px 'Press Start 2P'";
    foreground.fillStyle = "#ffffff";
    foreground.textAlign = "left";
    drawText(foreground, "SCOUT", foreground.canvas.width / 2 - 200, 430);
    foreground.font = "20px 'Press Start 2P'";
    foreground.fillStyle = "#aaaaaa";
    drawText(foreground, "THE NIMBLE", foreground.canvas.width / 2 - 200, 470);

    const soldier = new Soldier(foreground);
    soldier.coords.x += 100;
    soldier.coords.y = 600;
    soldier.render();
    foreground.font = "25px 'Press Start 2P'";
    foreground.fillStyle = "#ffffff";
    foreground.textAlign = "left";
    drawText(foreground, "SOLDIER", foreground.canvas.width / 2 - 200, 580);
    foreground.font = "20px 'Press Start 2P'";
    foreground.fillStyle = "#aaaaaa";
    drawText(foreground, "THE STRONG", foreground.canvas.width / 2 - 200, 620);

    const heavy = new Heavy(foreground);
    heavy.coords.x += 100;
    heavy.coords.y = 750;
    heavy.render();
    foreground.font = "25px 'Press Start 2P'";
    foreground.fillStyle = "#ffffff";
    foreground.textAlign = "left";
    drawText(foreground, "HEAVY", foreground.canvas.width / 2 - 200, 730);
    foreground.font = "20px 'Press Start 2P'";
    foreground.fillStyle = "#aaaaaa";
    drawText(foreground, "THE TOUGH", foreground.canvas.width / 2 - 200, 770);

    foreground.strokeStyle = "#ff0000";
    foreground.lineWidth = 5;
    foreground.beginPath();
    foreground.rect(foreground.canvas.width / 2 - 220, 370 + state.selectedClass * 150, 400, 150);
    foreground.stroke();
  },
  next(dt: number) {
    return;
  },
  listenForEvents() {
    addEventListener("keydown", function(event: KeyboardEvent) {
      if (!state && state.stage.type === StageType.GAME) {
        return;
      }

      const classes = [Scout, Soldier, Heavy];

      if (event.code === "KeyW") {
        state.selectedClass = (state.selectedClass - 1 + 3) % 3;
      } else if (event.code === "KeyS") {
        state.selectedClass = (state.selectedClass + 1 + 3) % 3;
      } else if (event.code === "Enter") {
        state.player = new classes[state.selectedClass](foreground);
        state.setStage(GameStage);
      }
    });
  }
};
