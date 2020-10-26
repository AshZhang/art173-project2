import { Vegetable } from "./Vegetable";

export class Enemy extends Vegetable {
    constructor(size: number, maxSpeed: number, acceleration: number, animMap: Map<string, string>) {
        super(size, maxSpeed, acceleration, animMap);
    }
    move(){
        this.sprite.setVelocityX(Math.random() * 2 * this.maxSpeed - this.maxSpeed);
        this.sprite.setVelocityY(Math.random() * 2 * this.maxSpeed - this.maxSpeed);
    }
    update(){
        this.move();
        super.updateAnim();
    }
    spawnAttack(){

    }
    gotoSoup(){
        
    }
}