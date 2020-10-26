import { Vegetable } from "./Vegetable";

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

    attack(): void{
        this.isAtking = true;
    }

    gotoSoup(){

    }
    // update(){
    //     this.move();
    //     super.updateAnim();
    // }
}