import { Vegetable } from "./Vegetable";
import * as CONST from "./Consts";

export class Enemy extends Vegetable {
    atkChance: number;
    canUpdateMove: boolean;
    constructor(health: number, atkPower: number, maxSpeed: number, acceleration: number, animMap: Map<string, string>) {
        super(health, atkPower, maxSpeed, acceleration, animMap);
        this.atkChance = 0.01;
        this.canUpdateMove = true;
    }
    move() {
        this.sprite.setVelocityX(Math.random() * 2 * this.maxSpeed - this.maxSpeed);
        this.sprite.setVelocityY(Math.random() * 2 * this.maxSpeed - this.maxSpeed);
        this.canUpdateMove = false;
        setTimeout(() => { this.canUpdateMove = true }, 250);
    }

    update() {
        if (Math.random() < this.atkChance) {
            this.attack();
        } else {
            if (this.canUpdateMove) {
                this.move();
            }
        }
        this.updateAnim();
    }

    reset(): void {
        this.sprite.setPosition(CONST.CANVAS_WIDTH / 4, CONST.CANVAS_HEIGHT / 2);
        this.layers = CONST.MAX_ENEMY_HEALTH;
        super.reset();
    }

    gotoSoup() {
        this.reset();
    }
}