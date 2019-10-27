import { Point } from "./classes/point";
import { Layer } from "./classes/layer";

import { MainMenuStage } from "./stages/main-menu";
import { TestStage } from "./stages/test";

import { state } from "./state";

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

  state.stage.clearLayers();
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

addEventListener("pointerdown", function(event: MouseEvent) {
  state.mousePosition = Point.fromRealXY(event.offsetX, event.offsetY);
});

addEventListener("load", function() {
  state.setStage(new MainMenuStage());
  autoSize();
  requestAnimationFrame(gameLoop);
});

// ! DEBUG
addEventListener("keydown", function(event: KeyboardEvent) {
  if (event.code === "F10" && !(state.stage instanceof TestStage)) {
    state.setStage(new TestStage());
  }
});
// / DEBUG
