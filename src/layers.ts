import { Point } from "./utils/point";
import { canvas } from "./canvas";

export class Layer {
  static defaultFont = "'Press Start 2P'";

  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public width: number;
  public height: number;

  constructor(id) {
    const root = document.getElementById("canvas");
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    this.canvas.id = id;
    this.autoSize();

    root.append(this.canvas);
  }

  protected autoSize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const size = Math.min(windowWidth, windowHeight);

    this.width = size;
    this.height = size;

    this.canvas.width = size;
    this.canvas.height = size;

    const root = document.getElementById("canvas");
    root.style.width = `${size}px`;
    root.style.height = `${size}px`;
  }

  public setStroke(color: string = "#000000", width: number = 0.2) {
    this.context.strokeStyle = color;
    this.context.lineWidth = canvas.toPixels(width);
  }

  public setFill(color: string) {
    this.context.fillStyle = color;
  }

  public setFont(
    size: number,
    color: string = "#ffffff",
    hAlign: CanvasTextAlign = "center",
    vAlign: CanvasTextBaseline = "middle"
  ) {
    this.setFill(color);
    this.setStroke("#000000");
    this.context.font = `${canvas.toPixels(size)}px ${Layer.defaultFont}`;
    this.context.textAlign = hAlign;
    this.context.textBaseline = vAlign;
  }

  public clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  public fill(color: string) {
    this.setFill(color);
    this.context.fillRect(0, 0, this.width, this.height);
  }

  public drawText(coords: Point, text: string) {
    this.context.fillText(text, coords.x, coords.y);
    this.context.strokeText(text, coords.x, coords.y);
  }

  public drawLine(from: Point, to: Point) {
    this.context.beginPath();
    this.context.moveTo(from.x, from.y);
    this.context.lineTo(to.x, to.y);
    this.context.stroke();
  }

  public drawRect(coords: Point, width: number, height: number) {
    this.context.beginPath();
    this.context.rect(coords.x, coords.y, canvas.toPixels(width), canvas.toPixels(height));
    this.context.fill();
    this.context.stroke();
  }

  public drawArc(coords: Point, radius: number) {
    this.context.beginPath();
    this.context.arc(coords.x, coords.y, canvas.toPixels(radius), 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();
  }
}

export const layers: { [name: string]: Layer } = {
  background: new Layer("background"),
  foreground: new Layer("foreground"),
  overlay: new Layer("overlay"),
  ui: new Layer("ui")
};
