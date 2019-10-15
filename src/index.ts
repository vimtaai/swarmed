import { state } from "./state";
import { foreground, background } from "./canvas";
import { GameStage } from "./stages/game";
import { ScoreScreenStage } from "./stages/score-screen";
import { MainMenuStage } from "./stages/main-menu";
import { StageType } from "./stage";
import { clearContext } from "./utils/context";

let lastRender: number = Date.now();

function render() {
  clearContext(background);
  clearContext(foreground);

  if (state.stage.type === StageType.MAIN_MENU) {
    MainMenuStage.render();
  } else if (state.stage.type === StageType.GAME) {
    GameStage.render();
  } else if (state.stage.type === StageType.SCORE_SCREEN) {
    ScoreScreenStage.render();
  }
}

function next(dt: number) {
  if (state.stage.type === StageType.MAIN_MENU) {
    MainMenuStage.next(dt);
  } else if (state.stage.type === StageType.GAME) {
    GameStage.next(dt);
  } else if (state.stage.type === StageType.SCORE_SCREEN) {
    ScoreScreenStage.next(dt);
  }
}

function gameLoop() {
  const dt: number = (Date.now() - lastRender) / 1000;

  next(dt);
  render();

  lastRender = Date.now();
  requestAnimationFrame(gameLoop);
}

addEventListener("load", function() {
  state.setStage(MainMenuStage);
  requestAnimationFrame(gameLoop);
});
