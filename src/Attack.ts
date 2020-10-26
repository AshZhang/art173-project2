import { Entity } from "./Entity";

export class Attack extends Entity{
    constructor(size, animMap: Map<string, string>){
        super(size, animMap);
    }
}