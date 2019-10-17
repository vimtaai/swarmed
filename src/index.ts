import { Point } from "./utils/point";
import { Layer } from "./utils/layer";

import { state } from "./state";
import { background, foreground, overlay, ui } from "./layers";

import { MainMenuStage } from "./actors/stages/main-menu";

let lastRender: number = Date.now();

function autoSize() {
  Layer.updateScaling();

  const canvases = document.querySelectorAll("canvas");

  for (const canvas of canvases) {
    canvas.width = Layer.width;
    canvas.height = Layer.height;
  }

  const root = document.getElementById("root");

  root.style.width = `${Layer.width}px`;
  root.style.height = `${Layer.height}px`;
}

function gameLoop() {
  const dt: number = (Date.now() - lastRender) / 1000;

  state.stage.next(dt);

  const layers = [background, foreground, overlay, ui];
  for (const layer of layers) {
    layer.clear();
  }

  state.stage.render();

  lastRender = Date.now();
  requestAnimationFrame(gameLoop);
}

addEventListener("resize", function() {
  autoSize();
});

addEventListener("load", function() {
  autoSize();

  state.setStage(MainMenuStage);

  requestAnimationFrame(gameLoop);
});

addEventListener("pointermove", function(event: MouseEvent) {
  state.mousePosition = Point.fromRealXY(event.offsetX, event.offsetY);
});
