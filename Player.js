const SPAWN_X;
const SPAWN_Y;
const PLAYER_SPEED;
const MAX_LAYERS;
const DIRECTIONS = Object.freeze({
    LEFT: "left",
    RIGHT: "right",
    DOWN: "down",
    UP: "up"
});
// TODO: define attack objects for each vegetable
const VEGETABLES = Object.freeze({
    ONION: {
        name: "Onion",
        runSpeed: 6,
        layers: 5,
        attackObj: null
    },
    CELERY: {
        name: "Celery",
        runSpeed: 4,
        layers: 3,
        attackObj: null
    },
    ARTICHOKE: {
        name: "Artichoke",
        runSpeed: 6,
        layers: 6,
        attackObj: null
    },
    CABBAGE: {
        name: "Cabbage",
        runSpeed: 2,
        layers: 6,
        attackObj: null
    }
});

class Player {
    constructor(vegetable) {
        this.x = SPAWN_X;
        this.y = SPAWN_Y;
        this.xVel = 0;
        this.yVel = 0;
        this.runSpeed = vegetable.runSpeed;
        this.layers = vegetable.layers;
        this.name = vegetable.name;
        this.attackObj = vegetable.attackObj;
    }

    run(direction) {
        if (direction == LEFT) {
            this.xVel = -this.runSpeed;
        } else if (direction == RIGHT) {
            this.xVel = this.runSpeed;
        } else if (direction == DOWN) {
            this.yVel = -this.runSpeed;
        } else {
            this.yVel = this.runSpeed;
        }
        this.x += this.xVel;
        this.y += this.yVel;
        // TODO: check wall collisions
    }

    attack() {
        // Spawn an attack object based on the value of this.attackObj
        // Each vegetable has a unique attack!
    }

    damage() {
        this.layers -= 1;
        if (layers <= 0) {
            this.gotoSoup();
        }
    }

    gotoSoup() {
        // Join the vegetable soup pot!
    }

}