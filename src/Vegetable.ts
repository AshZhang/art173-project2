import { Entity } from "./Entity";

export class Vegetable extends Entity {
    maxSpeed: number;
    acceleration: number;
    constructor(size: number, maxSpeed: number, acceleration: number, animMap: Map<string, string>) {
        super(size, animMap);
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
    }
}