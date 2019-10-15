import { state } from "./state";
import { Layers } from "./layers";

import { MainMenuStage } from "./stages/main-menu";

let lastRender: number = Date.now();

function gameLoop() {
  const dt: number = (Date.now() - lastRender) / 1000;

  state.stage.next(dt);

  for (const layer in Layers) {
    Layers[layer].clear();
  }

  state.stage.render();

  lastRender = Date.now();
  requestAnimationFrame(gameLoop);
}

function autoSize() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const size = Math.min(windowWidth, windowHeight);

  state.size = size;

  for (const layer in Layers) {
    Layers[layer].canvas.width = size;
    Layers[layer].canvas.height = size;
  }

  const root = document.getElementById("canvas");
  root.style.width = `${size}px`;
  root.style.height = `${size}px`;
}

addEventListener("resize", autoSize);

addEventListener("load", function() {
  autoSize();
  state.setStage(MainMenuStage);
  requestAnimationFrame(gameLoop);
});
