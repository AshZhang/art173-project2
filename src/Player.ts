import { Vegetable } from "./Vegetable";

export class Player extends Vegetable {
    constructor(size: number, maxSpeed: number, acceleration: number, animMap: Map<string, string>) {
        super(size, maxSpeed, acceleration, animMap);
    }
    move(){
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

    spawnAttack(){

    }
    gotoSoup(){
        
    }
    // update(){
    //     this.move();
    //     super.updateAnim();
    // }
}