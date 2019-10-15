import { state } from "./state";
import { canvas } from "./canvas";
import { layers } from "./layers";

import { MainMenuStage } from "./stages/main-menu";

let lastRender: number = Date.now();

function gameLoop() {
  const dt: number = (Date.now() - lastRender) / 1000;

  state.stage.next(dt);

  for (const layer in layers) {
    layers[layer].clear();
  }

  state.stage.render();

  lastRender = Date.now();
  requestAnimationFrame(gameLoop);
}

addEventListener("resize", function() {
  canvas.autoSize();
});

addEventListener("load", function() {
  canvas.autoSize();
  state.setStage(MainMenuStage);
  requestAnimationFrame(gameLoop);
});
