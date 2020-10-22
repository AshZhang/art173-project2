import { Entity } from "./Entity";

export class Vegetable extends Entity {
    maxSpeed: number;
    acceleration: number;
    cursors: any;
    constructor(size: number, maxSpeed: number, acceleration: number, animMap: Map<string, string>) {
        super(size, animMap);
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
    }

    setCursors(cursors){
        this.cursors = cursors;
    }

    updateAnim(){
        if(this.sprite.body.speed > 0.001){
            this.sprite.anims.play(this.animations.get('move'), true);
        }else{
            this.sprite.anims.play(this.animations.get('stop'));
        }
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
}