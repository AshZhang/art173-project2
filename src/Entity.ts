export class Entity{
    sprite: any;
    size: number;
    animations: Map<string, string>;
    constructor(size: number, animMap: Map<string, string>){
        this.size = size;
        this.animations = animMap;
    }
}