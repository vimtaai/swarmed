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

  public static add(pointA: Point, pointB: Point): Point {
    return new Point(pointA.x + pointB.x, pointA.y + pointB.y);
  }

  public static rotate(point: Point, angle: number, center: Point = new Point(0, 0)): Point {
    const rotationRadius = center.distanceTo(point);
    const relativePoint = new Point(Math.cos(angle) * rotationRadius, Math.sin(angle) * rotationRadius);
    return Point.add(center, relativePoint);
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

  public shiftX(amount: number): Point {
    return new Point(this.x + amount, this.y);
  }

  public shiftY(amount: number): Point {
    return new Point(this.x, this.y + amount);
  }

  public shiftXY(xAmount: number, yAmount: number): Point {
    return new Point(this.x + xAmount, this.y + yAmount);
  }

  public distanceTo(point: Point): number {
    return Math.sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2);
  }

  public facingTo(point: Point): number {
    return Math.atan2(point.y - this.y, point.x - this.x);
  }
}
