import 'phaser';
import { Vegetable } from './Vegetable';
import { Enemy } from './Enemy';
import { Player } from './Player';
import * as CONST from './Consts';

let player: Player;
let enemy: Enemy;
let cursors;

function preload() {
    this.load.spritesheet('onion', 'assets/Onion.png',
        { frameWidth: 64, frameHeight: 64 }
    );
    this.load.spritesheet('onion_atk', 'assets/Onion_atk.png',
        { frameWidth: 128, frameHeight: 128 }
    );
    this.load.spritesheet('enemy', 'assets/Enemy.png',
        { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('enemy_atk', 'assets/Enemy_atk.png',
        { frameWidth: 128, frameHeight: 128 }
    );
    this.load.image('bg', 'assets/bg.jpg');
}

function setupPlayer(sprite) {
    const animMap = new Map();
    animMap.set('move', 'onion_move');
    animMap.set('stop', 'onion_stop');
    animMap.set('atk', 'onion_atk');
    animMap.set('hurt', 'onion_hurt');
    player = new Player(CONST.MAX_PLAYER_HEALTH, CONST.PLAYER_ATK_POWER, CONST.PLAYER_SPEED, CONST.PLAYER_ACCEL, animMap);
    player.setCursors(cursors);
    player.sprite = sprite;
    player.sprite.setBounce(0.2);
    player.sprite.setCollideWorldBounds(true);
    player.sprite.on('animationcomplete', (a, f) => player.endAttack(a), player.sprite);
    player.sprite.body.setSize(110, 110);
}

function setupEnemy(sprite) {
    const animMap = new Map();
    animMap.set('move', 'enemy_move');
    animMap.set('stop', 'enemy_stop');
    animMap.set('atk', 'enemy_atk');
    animMap.set('hurt', 'enemy_hurt');
    enemy = new Enemy(CONST.MAX_ENEMY_HEALTH, CONST.ENEMY_ATK_POWER, CONST.ENEMY_SPEED, CONST.ENEMY_ACCEL, animMap);
    enemy.sprite = sprite;
    enemy.sprite.setBounce(0.2);
    enemy.sprite.setCollideWorldBounds(true);
    enemy.sprite.on('animationcomplete', (a, f) => enemy.endAttack(a), enemy.sprite);
    enemy.sprite.body.setSize(110, 110);
}
function create() {
    cursors = this.input.keyboard.createCursorKeys();
    this.anims.create({
        key: 'onion_move',
        frames: this.anims.generateFrameNumbers('onion', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'onion_atk',
        frames: this.anims.generateFrameNumbers('onion_atk', { start: 0, end: 2 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'onion_stop',
        frames: [{ key: 'onion', frame: 3 }],
        frameRate: 20
    });
    this.anims.create({
        key: 'onion_hurt',
        frames: [{ key: 'onion', frame: 6 }],
        frameRate: 20
    });
    this.anims.create({
        key: 'enemy_move',
        frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'enemy_atk',
        frames: this.anims.generateFrameNumbers('enemy_atk', { start: 0, end: 2 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'enemy_stop',
        frames: [{ key: 'enemy', frame: 3 }],
        frameRate: 20
    });
    this.anims.create({
        key: 'enemy_hurt',
        frames: [{ key: 'enemy', frame: 6 }],
        frameRate: 20
    });
    this.add.image(400, 300, 'bg');
    setupEnemy(this.physics.add.sprite(CONST.CANVAS_WIDTH / 4, CONST.CANVAS_HEIGHT / 2, 'enemy'));
    setupPlayer(this.physics.add.sprite(CONST.CANVAS_WIDTH * 3 / 4, CONST.CANVAS_HEIGHT/2, 'onion'));
    this.physics.add.overlap(player.sprite, enemy.sprite, (p_sprite, e_sprite) => {
        if (player.isAtking) {
            enemy.receiveDamage(player.atkPower);
        } else if (enemy.isAtking) {
            player.receiveDamage(enemy.atkPower);
        }
    }, null, this);
}
function update() {
    player.update();
    enemy.update();
}

const config = {
    type: Phaser.AUTO,
    width: CONST.CANVAS_WIDTH,
    height: CONST.CANVAS_HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
