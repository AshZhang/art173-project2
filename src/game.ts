import 'phaser';

let player;
let cursors;
const foregroundHills = [];
const backgroundHills = [];

function preload() {
    this.load.image('onionSheet', 'assets/Onion.png');
    this.load.image('hill', 'assets/hill.png');
    this.load.spritesheet('onion',
        'assets/Onion.png',
        { frameWidth: 64, frameHeight: 64 }
    );
}

function create() {
    for (let i = 0; i < 3; i++) {
        const hill = this.physics.add.sprite(-600 + i * 800, 150, 'hill');
        backgroundHills.push(hill);
    }
    for (let i = 0; i < 3; i++) {
        const hill = this.physics.add.sprite(-400 + i * 800, 300, 'hill');
        foregroundHills.push(hill);
    }
    player = this.physics.add.sprite(400, 450, 'onion');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

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
        // player.setVelocityX(-160);
        player.flipX = true;
        player.anims.play('move', true);
        foregroundHills.forEach((hill) => {
            hill.setVelocityX(200);
            if(hill.x > 1200){
                hill.x = -400;
            }
        });
        backgroundHills.forEach((hill) => {
            hill.setVelocityX(50);
            if(hill.x > 1200){
                hill.x = -400;
            }
        });
    }
    else if (cursors.right.isDown) {
        // player.setVelocityX(160);
        player.flipX = false;
        player.anims.play('move', true);
        foregroundHills.forEach((hill) => {
            hill.setVelocityX(-200);
            if(hill.x < -400){
                hill.x = 1200;
            }
        });
        backgroundHills.forEach((hill) => {
            hill.setVelocityX(-50);
            if(hill.x > 1200){
                hill.x = -400;
            }
        });
    }
    else {
        player.setVelocityX(0);
        foregroundHills.forEach((hill) => {
            hill.setVelocityX(0);
        });
        backgroundHills.forEach((hill) => {
            hill.setVelocityX(0);
        });
        player.anims.play('stop');
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
