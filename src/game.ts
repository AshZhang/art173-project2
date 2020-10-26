import 'phaser';
import { Vegetable } from './Vegetable';
import { Enemy } from './Enemy';
import { Player } from './Player';

const PLAYER_SPEED = 160;
const PLAYER_ACCEL = 200;
const PLAYER_ATK_POWER = 1;
const MAX_PLAYER_HEALTH = 5;

const ENEMY_SPEED = 160;
const ENEMY_ACCEL = 200;
const ENEMY_ATK_POWER = 1;
const MAX_ENEMY_HEALTH = 3;

const VEG_SIZE = 64;

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
}

function setupPlayer(sprite) {
    const animMap = new Map();
    animMap.set('move', 'onion_move');
    animMap.set('stop', 'onion_stop');
    animMap.set('atk', 'onion_atk');
    animMap.set('hurt', 'onion_hurt');
    player = new Player(MAX_PLAYER_HEALTH, PLAYER_ATK_POWER, PLAYER_SPEED, PLAYER_ACCEL, animMap);
    player.setCursors(cursors);
    player.sprite = sprite;
    player.sprite.setBounce(0.2);
    player.sprite.setCollideWorldBounds(true);
    player.sprite.on('animationcomplete', (a, f) => player.endAttack(a), player.sprite);
}

function setupEnemy(sprite) {
    const animMap = new Map();
    animMap.set('move', 'enemy_move');
    animMap.set('stop', 'enemy_stop');
    animMap.set('hurt', 'onion_hurt');
    enemy = new Enemy(MAX_ENEMY_HEALTH, ENEMY_ATK_POWER, ENEMY_SPEED, ENEMY_ACCEL, animMap);
    enemy.sprite = sprite;
    enemy.sprite.setBounce(0.2);
    enemy.sprite.setCollideWorldBounds(true);
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
        key: 'enemy_stop',
        frames: [{ key: 'enemy', frame: 3 }],
        frameRate: 20
    });
    setupEnemy(this.physics.add.sprite(300, 450, 'enemy'));
    setupPlayer(this.physics.add.sprite(400, 450, 'onion'));
    this.physics.add.overlap(player.sprite, enemy.sprite, (p_sprite, e_sprite) => {
        if (player.isAtking) {
            enemy.receiveDamage(player.atkPower);
        }
    }, null, this);
}
function update() {
    player.update();
    enemy.update();
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
