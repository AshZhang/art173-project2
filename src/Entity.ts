export class Entity{
    sprite: any;
    size: number;
    animations: Map<string, string>;
    cursors: any;
    constructor(size: number, animMap: Map<string, string>){
        this.size = size;
        this.animations = animMap;
    }
    setCursors(cursors){
        this.cursors = cursors;
    }
}