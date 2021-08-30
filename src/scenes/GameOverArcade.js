import Phaser from "phaser";

let end;
let tryAgain;
let backOver;
let backEvent;
let treePoster;
let cursors;
let textOver;
let snowbig;
let snowsmall;
let transEvent;
let blackGround;

var finalScore;
let scoreText;

class GameOverArcade extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameOverArcade'
        });
    }
    init(data) {
        finalScore = data.score;
    }

    preload() {
        //button
        this.load.image('end', 'src/image/button/end.png');
        this.load.image('tryAgain', 'src/image/button/again.png');
        this.load.image('snowbig', 'src/image/button/snowbig.png');
        this.load.image('snowsmall', 'src/image/button/snowsmall.png');
        //backGround
        this.load.image("backOver", "src/image/background/fullBG.png");
        this.load.image("blackGround", "src/image/background/SkyBlock.png");
        //poster
        this.load.image("treePoster", "src/image/gameOver/treeposter.png");
        //text
        this.load.image("TextOver", "src/image/gameOver/TextOver.png");
    }

    create() {
        //Show X Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        this.cameras.main.fadeIn(2000);

        backOver = this.physics.add.image(0, 0, 'backOver')
            .setOrigin(0, 0)
            .setScale(1.5)
            .setVelocityX(-200);
        //-600
        blackGround = this.physics.add.image(675, 140, 'blackGround')
            .setOrigin(0, 0)
            .setScale(1, 1)
            .setVelocityY(0);
        blackGround.alpha = 0.5;

        treePoster = this.physics.add.image(this.game.renderer.width + 350, 360, 'treePoster')
            .setScale(1)
            .setVelocityX(-550);



        textOver = this.physics.add.image(950, -1600, 'TextOver')
            .setScale(0.8)
            .setVelocityY(600);

        snowbig = this.physics.add.image(350, (this.game.renderer.height + 1300), 'snowbig')
            .setScale(0.7)
            .setDepth(1)
            .setVelocityY(-450);
        tryAgain = this.physics.add.image(350, (this.game.renderer.height + 1300), 'tryAgain')
            .setScale(0.7)
            .setVelocityY(-450);
        tryAgain.setInteractive();

        tryAgain.on('pointerout', () => {
            snowbig.setScale(0.7)
        })
        tryAgain.on('pointerover', () => {
            snowbig.setScale(0.8)
        })
        tryAgain.on('pointerup', () => {
            this.cameras.main.fadeOut(1000);
            transEvent = this.time.addEvent({
                delay: 1000,
                callback: function () {
                    this.scene.start('GameScene');
                },
                callbackScope: this,
                loop: false,
            })


        })

        snowsmall = this.physics.add.image(350, (this.game.renderer.height + 1500), 'snowsmall')
            .setScale(0.5)
            .setDepth(1)
            .setVelocityY(-450);
        end = this.physics.add.image(350, (this.game.renderer.height + 1500), 'end')
            .setScale(0.5)
            .setVelocityY(-450);
        end.setInteractive();
        end.on('pointerout', () => {
            snowsmall.setScale(0.5)
        })
        end.on('pointerover', () => {
            snowsmall.setScale(0.6)
        })
        end.on('pointerup', () => {
            this.cameras.main.fadeOut(1000);
            transEvent = this.time.addEvent({
                delay: 1000,
                callback: function () {
                    location.reload();
                },
                callbackScope: this,
                loop: false,
            })

        })

        //Score
        // scoreText = this.add.text(720, 250, 'score : 0', { fontFamily: 'slkscr',Silkscreen, fill: '#fff' })
        //     .setDepth(10)
        //     .setScale(4)
        //     .setResolution(1);
        


    }



    update(delta, time) {
        //Show X Y
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');

        // scoreText.setText('Score : ' + finalScore);

        if (treePoster.x < 350) {
            backOver.setVelocityX(0);
            treePoster.setVelocityX(0);
        }
        if (textOver.y > 100) {
            textOver.setVelocityY(0);
            
            // if (blackGround.y > 140) {
            //     blackGround.setVelocityY(0);
            // }else{
            //     blackGround.setVelocityY(1000);
            // }
        }

        if (tryAgain.y < 520) {
            tryAgain.setVelocityY(0);
            snowbig.setVelocityY(0);
        }
        if (end.y < 610) {
            end.setVelocityY(0);
            snowsmall.setVelocityY(0);
        }
    }
}

export default GameOverArcade;
