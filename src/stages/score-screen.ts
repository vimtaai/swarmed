import { drawText, fillBackground } from "../utils/context";
import { state } from "../state";
import { StageType } from "../stage";
import { foreground, background } from "../canvas";

export const ScoreScreenStage = {
  type: StageType.SCORE_SCREEN,
  init() {},
  render() {
    fillBackground(background, "#000000");

    foreground.strokeStyle = "#000000";
    foreground.lineWidth = 2;
    foreground.textAlign = "center";
    foreground.textBaseline = "middle";

    foreground.font = "50px 'Press Start 2P'";
    foreground.fillStyle = "#ff0000";
    drawText(foreground, "GAME OVER", foreground.canvas.width / 2, 100);

    foreground.font = "30px 'Press Start 2P'";
    foreground.fillStyle = "#ffffff";
    drawText(foreground, "YOUR FINAL SCORE: " + state.player.score, foreground.canvas.width / 2, 300);
  },
  next(dt: number) {
    return;
  },
  listenForEvents() {}
};
