import { Layer } from "./layer";

export class Point {
  public static maxX: number = 1280;
  public static maxY: number = 720;

  public static get aspectRatio(): number {
    return Point.maxX / Point.maxY;
  }

  public static clone(point: Point): Point {
    return new Point(point.x, point.y);
  }

  public static fromPercentage(percX: number, percY: number): Point {
    return new Point((Point.maxX * percX) / 100, (Point.maxY * percY) / 100);
  }

  public static fromRealXY(realX: number, realY: number): Point {
    return new Point(Layer.fromPixels(realX), Layer.fromPixels(realY));
  }

  public x: number;
  public y: number;

  public get realX() {
    return Layer.toPixels(this.x);
  }

  public get realY() {
    return Layer.toPixels(this.y);
  }

  public get outOfGameArea() {
    return this.x < 0 || this.x > Point.maxX || this.y < 0 || this.y > Point.maxY;
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public plus(point: Point): Point {
    return new Point(this.x + point.x, this.y + point.y);
  }

  public minus(point: Point): Point {
    return new Point(this.x - point.x, this.y - point.y);
  }

  public times(amount: number): Point {
    return new Point(this.x * amount, this.y * amount);
  }

  public shiftX(amount: number): Point {
    return new Point(this.x + amount, this.y);
  }

  public shiftY(amount: number): Point {
    return new Point(this.x, this.y + amount);
  }

  public shiftXY(xAmount: number, yAmount: number): Point {
    return new Point(this.x + xAmount, this.y + yAmount);
  }

  public between(pointA: Point, pointB: Point): boolean {
    return this.x >= pointA.x && this.x <= pointB.x && this.y >= pointA.y && this.y <= pointB.y;
  }

  public distanceTo(point: Point): number {
    return Math.sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2);
  }

  public facingTo(point: Point): number {
    return Math.atan2(point.y - this.y, point.x - this.x);
  }
}
