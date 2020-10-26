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

    abstract attack(): void;

    endAttack(animation) {
        if (animation.key === this.animations.get('atk')) {
            this.isAtking = false;
            this.updateAnim();
        }
    }

    receiveDamage(atkPower: number) {
        console.log(`I got called and ${this.canBeHurt}`);
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

    abstract gotoSoup(): void;

    update() {
        this.move();
        if (this.cursors.space.isDown && !this.isAtking) {
            this.attack();
        }
        this.updateAnim();
    }

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