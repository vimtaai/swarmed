import { Point } from "../../classes/point";
import { Layer } from "../../classes/layer";
import { UIElement } from "../../classes/ui-element";

import { HealthIndicator } from "../../entities/ui-elements/health-indicator";

import { state } from "../../state";

export class InventoryIndicator extends UIElement {
  public static coords = HealthIndicator.coords.shiftXY(
    HealthIndicator.width + HealthIndicator.height * 0.4,
    HealthIndicator.height / 2
  );
  public static width = 36;
  public static height = 36;

  public render(layer: Layer) {
    const radius = HealthIndicator.height / 4;
    const panelCoords = InventoryIndicator.coords.shiftX(-HealthIndicator.height * 0.2);

    layer.setStroke("#000000", 2);
    layer.setFill(state.localPlayer.secondaryColor);
    layer.context.moveTo(panelCoords.realX - radius, panelCoords.realY - radius * 2);
    layer.context.bezierCurveTo(
      panelCoords.realX - radius,
      panelCoords.realY - radius * 1.5,
      panelCoords.realX + radius * 1.5,
      panelCoords.realY - radius,
      panelCoords.realX + radius * 1.5,
      panelCoords.realY
    );
    layer.context.bezierCurveTo(
      panelCoords.realX + radius * 1.5,
      panelCoords.realY + radius,
      panelCoords.realX - radius,
      panelCoords.realY + radius * 1.5,
      panelCoords.realX - radius,
      panelCoords.realY + radius * 2
    );
    layer.context.fill();
    layer.context.stroke();
    layer.drawArc(InventoryIndicator.coords, 22);

    if (state.localPlayer.inventory !== null) {
      state.localPlayer.inventory.renderRelative(layer);
    }
  }
}
