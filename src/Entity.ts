export class Entity{
    sprite: any;
    animations: Map<string, string>;
    constructor(animMap: Map<string, string>){
        this.animations = animMap;
    }
}