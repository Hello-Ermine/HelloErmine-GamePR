import Phaser from "phaser";

let BgToturial;
let board;
let textTutorial;
let showInfo;
let tutorialEvent;
let count = 0;
let text;

let info02;

let snowmanWalk;
let snowballWalk;
let golemWalk;

let nextTutorial;
let backTutorial;
let playTutorial;
let switchScene;
let backScene;

class TutorialScene02 extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'TutorialScene02'
        });
    }

    preload() {
        //back ground
        this.load.image('BgToturial', 'src/image/tutorialScene/BG.png');
        this.load.image('board', 'src/image/tutorialScene/board.png');

        //font
        this.load.bitmapFont('ZFT', 'src/image/object/ZFT_0.png', 'src/fonts/ZFT_3/ZFT.fnt');

        //text
        this.load.image('textTutorial', 'src/image/tutorialScene/text_tutorial.png');

        //object
        this.load.image('info02', 'src/image/tutorialScene/Info02.png');

        //character
        this.load.spritesheet('snowmanWalk', 'src/image/Character/Snowman.png',
            { frameWidth: 1000, frameHeight: 1000 });
        this.load.spritesheet("snowballWalk", "src/image/Character/snowball.png",
            { frameWidth: 300, frameHeight: 300, });
        this.load.spritesheet('golemWalk', 'src/image/Character/golem/Golem2_sprite.png',
            { frameWidth: 1000, frameHeight: 1000 });

        //button
        this.load.image('playTutorial', 'src/image/button/Play.png');
        this.load.image('backTutorial', 'src/image/button/back.png');

    }

    create() {
        //Show X Y
        this.label = this.add.text(40, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        this.cameras.main.fadeIn(500);

        BgToturial = this.add.image(0, 0, 'BgToturial')
            .setOrigin(0, 0)
            .setInteractive();

        board = this.physics.add.image(this.game.renderer.width / 2, this.game.renderer.height + 500, 'board')
            .setVelocityY(-1000);

        info02 = this.physics.add.image(0, 0 + 12, 'info02').setOrigin(0, 0);
        info02.alpha = 0;

        // let walk = this.add.bitmapText(160,210, 'ZFT', 'กด W A S D \nเพื่อเคลื่อนที่', 50).setDepth(1000);
        // text.setText('Bitmap Fonts! ขอแสดงความยินดี \n HI');

        snowmanWalk = this.physics.add.sprite(265, 350, 'snowmanWalk')
            .setScale(0.3);
        snowmanWalk.alpha = 0;
        snowmanWalk.flipX = !snowmanWalk.flipX;

        snowballWalk = this.physics.add.sprite(640, 375, 'snowballWalk')
            .setScale(0.65);
        snowballWalk.alpha = 0;

        golemWalk = this.physics.add.sprite(1010, 340, 'golemWalk')
            .setScale(0.35);
        golemWalk.alpha = 0;

        let snowmanWalkAni = this.anims.create({
            key: 'snowmanWalkAni',
            frames: this.anims.generateFrameNumbers('snowmanWalk', {
                start: 0,
                end: 7
            }),
            duration: 750,
            framerate: 1,
            repeat: -1
        });
        snowmanWalk.anims.play('snowmanWalkAni', true);

        let snowballWalkAni = this.anims.create({
            key: 'snowballWalkAni',
            frames: this.anims.generateFrameNumbers('snowballWalk', {
                start: 0,
                end: 2
            }),
            duration: 500,
            framerate: 1,
            repeat: -1
        });
        snowballWalk.anims.play('snowballWalkAni', true);

        let golemWalkAni = this.anims.create({
            key: 'golemWalkAni',
            frames: this.anims.generateFrameNumbers('golemWalk', {
                start: 0,
                end: 8
            }),
            duration: 1200,
            framerate: 1,
            repeat: -1
        });
        golemWalk.anims.play('golemWalkAni', true);

        // Snow man
        // ermineWalk = this.physics.add.sprite(260, 410, 'ermineWalk')
        //     .setScale(0.4);
        // ermineWalk.alpha = 0;


        // ermine Throw
        // let ermineThrowAni = this.anims.create({
        //     key: 'ermineThrowAni',
        //     frames: this.anims.generateFrameNumbers('ermineWalk', {
        //         start: 4,
        //         end: 9
        //     }),
        //     duration: 650,
        //     framerate: 10,
        //     repeat: -1
        // })
        // ermineThrow.anims.play('ermineThrowAni', true);

        playTutorial = this.physics.add.image(1180, 670, 'playTutorial')
            .setScale(0.45)
            .setDepth(100)
            .setInteractive();

            playTutorial.on('pointerover', () => {
                playTutorial.setScale(0.5);
        })
        playTutorial.on('pointerout', () => {
            playTutorial.setScale(0.45);
        })

        playTutorial.on('pointerup', () => {
            this.cameras.main.fadeOut(500)
            switchScene = this.time.addEvent({
                delay: 500,
                callback: function () {
                    this.scene.start('MainMenu');
                    // ermineAni.destroy();
                    // snowmanAni.destroy();
                },
                callbackScope: this,
                loop: false,
            });
        });

        backTutorial = this.physics.add.image(1010, 670, 'backTutorial')
            .setScale(0.47)
            .setDepth(100)
            .setInteractive();

        backTutorial.on('pointerover', () => {
            backTutorial.setScale(0.52);
        })
        backTutorial.on('pointerout', () => {
            backTutorial.setScale(0.47);
        })

        backTutorial.on('pointerup', () => {
            this.cameras.main.fadeOut(500)
            backScene = this.time.addEvent({
                delay: 500,
                callback: function () {
                    this.scene.start('TutorialScene');
                    // ermineAni.destroy();
                    // snowmanAni.destroy();
                },
                callbackScope: this,
                loop: false,
            });
        });




    }

    update(delta, time) {
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');


        if (board.y < 380) {
            board.setVelocityY(0);
            if (count == 0)
                count++;
            this.tweens.add({
                targets: info02,
                duration: 250,
                alpha: 1
            });
            this.tweens.add({
                targets: snowmanWalk,
                duration: 250,
                alpha: 1
            });
            this.tweens.add({
                targets: snowballWalk,
                duration: 250,
                alpha: 1
            });
            this.tweens.add({
                targets: golemWalk,
                duration: 250,
                alpha: 1
            });

        }
        count = 0;


    }
}

export default TutorialScene02;
