import 'phaser';
import { Vegetable } from './Vegetable';

let player: Vegetable;
let cursors;

function preload() {
    const animMap = new Map();
    animMap.set('onion', 'assets/Onion.png');
    player = new Vegetable(64, 160, 200, animMap);
    player.animations.forEach((value, key, map) => {
        this.load.spritesheet(key, value,
            { frameWidth: player.size, frameHeight: player.size }
        );
    });
}

function create() {
    player.sprite = this.physics.add.sprite(400, 450, 'onion');
    const playerSprite = player.sprite;

    playerSprite.setBounce(0.2);
    playerSprite.setCollideWorldBounds(true);

    this.anims.create({
        key: 'move',
        frames: this.anims.generateFrameNumbers('onion', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'stop',
        frames: [{ key: 'onion', frame: 3 }],
        frameRate: 20
    });
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        player.sprite.setVelocityX(-160);
        player.sprite.flipX = true;
        player.sprite.anims.play('move', true);
    }
    else if (cursors.right.isDown) {
        player.sprite.setVelocityX(160);
        player.sprite.flipX = false;
        player.sprite.anims.play('move', true);
    }
    else {
        player.sprite.setVelocityX(0);
        player.sprite.anims.play('stop');
    }
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
