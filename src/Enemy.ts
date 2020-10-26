import { Vegetable } from "./Vegetable";

export class Enemy extends Vegetable {
    constructor(health: number, atkPower: number, maxSpeed: number, acceleration: number, animMap: Map<string, string>) {
        super(health, atkPower, maxSpeed, acceleration, animMap);
    }
    move(){
        this.sprite.setVelocityX(Math.random() * 2 * this.maxSpeed - this.maxSpeed);
        this.sprite.setVelocityY(Math.random() * 2 * this.maxSpeed - this.maxSpeed);
    }
    update(){
        this.move();
        super.updateAnim();
    }
    attack(){

    }
    gotoSoup(){
        
    }
}