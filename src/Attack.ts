import { Entity } from "./Entity";
import { Vegetable } from "./Vegetable";

export class Attack extends Entity{
    atkPower: number;
    constructor(animMap: Map<string, string>){
        super(animMap);
    }

    causeDamage(otherVeg: Vegetable){
        otherVeg.receiveDamage(this.atkPower);
    }
}