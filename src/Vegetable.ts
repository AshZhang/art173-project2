import { Entity } from "./Entity";

export abstract class Vegetable extends Entity {
    maxSpeed: number;
    acceleration: number;
    cursors: any;
    layers: number;
    atkPower: number;
    isAtking: boolean;
    canBeHurt: boolean;
    constructor(health: number, atkPower: number, maxSpeed: number, acceleration: number, animMap: Map<string, string>) {
        super(animMap);
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
        this.atkPower = atkPower;
        this.isAtking = false;
        this.canBeHurt = true;
        this.layers = health;
    }

    setCursors(cursors) {
        this.cursors = cursors;
    }

    abstract move(): void;

    attack(): void{
        this.isAtking = true;
    }

    endAttack(animation) {
        if (animation.key === this.animations.get('atk')) {
            this.isAtking = false;
            this.updateAnim();
        }
    }

    receiveDamage(atkPower: number) {
        if (this.canBeHurt) {
            this.canBeHurt = false;
            this.layers -= atkPower;
            if (this.layers <= 0) {
                this.gotoSoup();
            } else {
                setTimeout(() => {
                    this.canBeHurt = true;
                    this.updateAnim();
                }, 1000);
            }
        }
    }

    reset(): void{
        this.sprite.setVelocity(0);
        this.sprite.setAcceleration(0);
        this.isAtking = false;
        this.canBeHurt = true;
        this.updateAnim();
    }

    abstract gotoSoup(): void;

    abstract update(): void;

    updateAnim() {
        if (!this.canBeHurt) {
            this.sprite.anims.play(this.animations.get('hurt'));
        } else if (this.isAtking) {
            this.sprite.anims.play(this.animations.get('atk'), true);
        } else if (this.sprite.body.speed > 0.001) {
            this.sprite.anims.play(this.animations.get('move'), true);
        } else {
            this.sprite.anims.play(this.animations.get('stop'));
        }
    }
}