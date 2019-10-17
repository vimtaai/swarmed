import { Point } from "./point";

export class Layer {
  public static defaultFont = "'Press Start 2P'";
  public static scaling = 1;

  public static get width() {
    return Point.maxX * Layer.scaling;
  }

  public static get height() {
    return Point.maxY * Layer.scaling;
  }

  public static toPixels(coordinate: number): number {
    return coordinate * Layer.scaling;
  }

  public static fromPixels(pixel: number): number {
    return pixel / Layer.scaling;
  }

  public static updateScaling() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const usedWidth = height * Point.aspectRatio < width ? height * Point.aspectRatio : width;

    Layer.scaling = usedWidth / Point.maxX;
  }

  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  constructor(id: string) {
    const root = document.getElementById("root");
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    this.canvas.id = id;

    root.append(this.canvas);
  }

  public setStroke(color: string = "#000000", width: number = 2) {
    this.context.strokeStyle = color;
    this.context.lineWidth = Layer.toPixels(width);
  }

  public setFill(color: string) {
    this.context.fillStyle = color;
  }

  public setFont(size: number, color: string = "#ffffff", hAlign: CanvasTextAlign = "center") {
    this.setFill(color);
    this.setStroke("#000000");
    this.context.font = `${Layer.toPixels(size)}px ${Layer.defaultFont}`;
    this.context.textAlign = hAlign;
    this.context.textBaseline = "middle";
  }

  public clear() {
    this.context.clearRect(0, 0, Layer.width, Layer.height);
  }

  public fill(color: string) {
    this.setFill(color);
    this.context.fillRect(0, 0, Layer.width, Layer.height);
  }

  public drawText(coords: Point, text: string) {
    this.context.fillText(text, coords.realX, coords.realY);
    this.context.strokeText(text, coords.realX, coords.realY);
  }

  public drawLine(from: Point, to: Point) {
    this.context.beginPath();
    this.context.moveTo(from.realX, from.realY);
    this.context.lineTo(to.realX, to.realY);
    this.context.stroke();
  }

  public drawRect(coords: Point, width: number, height: number) {
    this.context.beginPath();
    this.context.rect(coords.realX, coords.realY, Layer.toPixels(width), Layer.toPixels(height));
    this.context.fill();
    this.context.stroke();
  }

  public drawArc(coords: Point, radius: number) {
    this.context.beginPath();
    this.context.arc(coords.realX, coords.realY, Layer.toPixels(radius), 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();
  }
}
