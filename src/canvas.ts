import { layers } from "./layers";

export class Canvas {
  protected root: HTMLElement;
  protected canvases: HTMLCanvasElement[];
  protected width: number;
  protected height: number;

  public size: number = 200;
  public scale: number;

  constructor() {
    this.root = document.getElementById("canvas");
    this.canvases = Array.from(this.root.querySelectorAll("canvas"));
  }

  public autoSize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const size = Math.min(windowWidth, windowHeight);

    this.width = size;
    this.height = size;

    this.scale = this.width / this.size;

    for (const layer in layers) {
      layers[layer].canvas.width = size;
      layers[layer].canvas.height = size;
    }

    this.root.style.width = `${size}px`;
    this.root.style.height = `${size}px`;
  }

  public toPixels(coordinate: number) {
    return (coordinate / 100) * this.size * this.scale;
  }

  public fromPixels(pixel: number) {
    return (pixel * 100) / this.size / this.scale;
  }
}

export const canvas = new Canvas();
