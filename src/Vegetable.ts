import { Entity } from "./Entity";

export abstract class Vegetable extends Entity {
    maxSpeed: number;
    acceleration: number;
    cursors: any;
    layers: number;
    attack: number;
    constructor(size: number, maxSpeed: number, acceleration: number, animMap: Map<string, string>) {
        super(size, animMap);
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
    }

    setCursors(cursors){
        this.cursors = cursors;
    }

    abstract move(): void;

    abstract spawnAttack(): void;

    receiveDamage(atkPower: number){
        this.layers -= atkPower;
        if(this.layers <= 0){
            this.gotoSoup();
        }
    }

    abstract gotoSoup(): void;

    update(){
        console.log(this);
        this.move();
        this.updateAnim();
    }

    updateAnim(){
        if(this.sprite.body.speed > 0.001){
            this.sprite.anims.play(this.animations.get('move'), true);
        }else{
            this.sprite.anims.play(this.animations.get('stop'));
        }
    }
}