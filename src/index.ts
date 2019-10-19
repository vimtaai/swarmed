import { Point } from "./classes/point";
import { Layer } from "./classes/layer";

import { MainMenuStage } from "./actors/stages/main-menu";
import { TestStage } from "./actors/stages/test";

import { state } from "./state";
import { background, foreground, overlay, ui } from "./layers";

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

addEventListener("pointermove", function(event: MouseEvent) {
  state.mousePosition = Point.fromRealXY(event.offsetX, event.offsetY);
});

addEventListener("load", function() {
  autoSize();

  state.setStage(MainMenuStage);

  requestAnimationFrame(gameLoop);
});

// ! DEBUG
addEventListener("keydown", function(event: KeyboardEvent) {
  if (event.code === "F10") {
    state.setStage(TestStage);
  }
});
// / DEBUG
