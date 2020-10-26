import { Vegetable } from "./Vegetable";
import * as CONST from "./Consts";

export class Enemy extends Vegetable {
    constructor(health: number, atkPower: number, maxSpeed: number, acceleration: number, animMap: Map<string, string>) {
        super(health, atkPower, maxSpeed, acceleration, animMap);
    }
    move(){
        this.sprite.setVelocityX(Math.random() * 2 * this.maxSpeed - this.maxSpeed);
        this.sprite.setVelocityY(Math.random() * 2 * this.maxSpeed - this.maxSpeed);
    }

    update() {
        this.move();
        
        this.updateAnim();
    }

    reset(): void{
        this.sprite.setPosition(CONST.CANVAS_WIDTH / 4, CONST.CANVAS_HEIGHT/2);
        this.layers = CONST.MAX_ENEMY_HEALTH;
        super.reset();
    }

    gotoSoup(){
        this.reset();
    }
}