import { Vegetable } from "./Vegetable";
import * as CONST from "./Consts";

export class Player extends Vegetable {
    constructor(health: number, atkPower: number, maxSpeed: number, acceleration: number, animMap: Map<string, string>) {
        super(health, atkPower, maxSpeed, acceleration, animMap);
    }
    move(): void{
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-160);
            this.sprite.flipX = true;
        }
        else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(160);
            this.sprite.flipX = false;
        }
        else {
            this.sprite.setVelocityX(0);
        }
        if (this.cursors.up.isDown) {
            this.sprite.setVelocityY(-160);
        }
        else if (this.cursors.down.isDown) {
            this.sprite.setVelocityY(160);
        }
        else {
            this.sprite.setVelocityY(0);
        }
    }

    reset(): void{
        this.sprite.setPosition(CONST.CANVAS_WIDTH * 3 / 4, CONST.CANVAS_HEIGHT/2);
        this.layers = CONST.MAX_PLAYER_HEALTH;
        super.reset();
    }

    update() {
        this.move();
        if (this.cursors.space.isDown && !this.isAtking) {
            this.attack();
        }
        this.updateAnim();
    }

    gotoSoup(){
        this.reset();
    }
}