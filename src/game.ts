import 'phaser';
import { Vegetable } from './Vegetable';

let player: Vegetable;

let cursors;

function preload() {
    this.load.spritesheet('onion', 'assets/Onion.png',
        { frameWidth: 64, frameHeight: 64 }
    );
}

function setupPlayer(sprite){
    const animMap = new Map();
    animMap.set('move', 'onion_move');
    animMap.set('stop', 'onion_stop');
    player = new Vegetable(64, 160, 200, animMap);
    player.setCursors(cursors);
    player.sprite = sprite;
    player.sprite.setBounce(0.2);
    player.sprite.setCollideWorldBounds(true);
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
        key: 'onion_stop',
        frames: [{ key: 'onion', frame: 3 }],
        frameRate: 20
    });
    setupPlayer(this.physics.add.sprite(400, 450, 'onion'));
}

function update() {
    player.move();
    player.updateAnim();
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
