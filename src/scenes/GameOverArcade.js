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
let paper;

//score
let scoreFinal;
let scorePlay;
//time
let timeFinal;
let timePlay;
//rank
let rank;
let rankCrate = 0;
let rankVelo = 100;

class GameOverArcade extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameOverArcade'
        });
    }
    init(data) {
        scoreFinal = data.score;
    }

    preload() {
        //button
        this.load.image('end', 'src/image/button/end.png');
        this.load.image('tryAgain', 'src/image/button/again.png');
        this.load.image('snowbig', 'src/image/button/snowbig.png');
        this.load.image('snowsmall', 'src/image/button/snowsmall.png');
        //backGround
        this.load.image("backOver", "src/image/background/fullBG.png");
        this.load.image("paper", "src/image/gameOver/paper01.png");
        //poster
        this.load.image("treePoster", "src/image/gameOver/treeposter.png");
        //text
        this.load.image("TextOver", "src/image/gameOver/TextOver.png");
        //font
        this.load.bitmapFont('ZFT', 'src/fonts/ZFT_3/ZFT_0.png', 'src/fonts/ZFT_3/ZFT.fnt');
        //Rank
        this.load.image("rankS", "src/image/gameOver/Rank/rank_S_pixel.png");
        this.load.image("rankA", "src/image/gameOver/Rank/rank_A_pixel.png");
        this.load.image("rankB", "src/image/gameOver/Rank/rank_B_pixel.png");
        this.load.image("rankC", "src/image/gameOver/Rank/rank_C_pixel.png");
        this.load.image("rankD", "src/image/gameOver/Rank/rank_D_pixel.png");

    }

    create() {
        //Show X Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        console.log(scoreFinal);

        this.cameras.main.fadeIn(2000);

        backOver = this.physics.add.image(0, 0, 'backOver')
            .setOrigin(0, 0)
            .setScale(1.5)
            .setVelocityX(-200);
        //-600
        paper = this.physics.add.image(945, -350, 'paper')
            .setScale(1.05)
            .setVelocityY(0);

        textOver = this.physics.add.image(940, -50, 'TextOver')
            .setScale(0.65)
            .setVelocityY(0);

        treePoster = this.physics.add.image(this.game.renderer.width + 350, 360, 'treePoster')
            .setScale(1)
            .setVelocityX(-550);

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

        scorePlay = this.add.dynamicBitmapText(760, 455, 'ZFT', 'Score : 0', 50)
            .setDepth(1000)
            .setTint(0x61390A);

        timePlay = this.add.dynamicBitmapText(760, 520, 'ZFT', 'Time : 0', 50)
            .setDepth(1000)
            .setTint(0x61390A);

        scorePlay.alpha = 0;
        timePlay.alpha = 0;


        // let textTest = this.add.text(100, 100, '', { font: '64px ZFT', fill: '#00ff00' });
        // textTest.setText([
        //     'Level: ' + this.data.get('level'),
        //     'Lives: ' + this.data.get('lives'),
        //     'Score: ' + this.data.get('score')
        // ]);


    }

    update(delta, time) {
        //Show X Y
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');

        scorePlay.setText('Score : ' + scoreFinal);
        timePlay.setText('Time : ' + timeFinal);


        scoreFinal = 500;
        if (rankCrate == 0) {
            if (scoreFinal >= 1000) {
                rank = this.physics.add.image(940, 340, 'rankS')
                    .setScale(1.2)
                    .setDepth(1);
                rank.alpha = 0;
            } else if (scoreFinal >= 750) {
                rank = this.physics.add.image(940, 340, 'rankA')
                    .setScale(1.2)
                    .setDepth(1);
                rank.alpha = 0;
            } else if (scoreFinal >= 500) {
                rank = this.physics.add.image(940, 340, 'rankB')
                    .setScale(1.2)
                    .setDepth(1);
                rank.alpha = 0;
            } else if (scoreFinal >= 250) {
                rank = this.physics.add.image(940, 340, 'rankC')
                    .setScale(1.2)
                    .setDepth(1);
                rank.alpha = 0;
            } else if (scoreFinal >= 0) {
                rank = this.physics.add.image(940, 340, 'rankD')
                    .setScale(1.2)
                    .setDepth(1);
                rank.alpha = 0;
            }
            rankCrate = 1;
            rank.setVelocityY(rankVelo);
        }

        if( rank.y > 350){
            rank.setVelocityY(rankVelo-=5);
        }else if( rank.y < 330){
            rank.setVelocityY(rankVelo+=5);
        }



        if (treePoster.x < 350) {
            backOver.setVelocityX(0);
            treePoster.setVelocityX(0);

            if (paper.y >= 360) {
                paper.setVelocityY(0);

                if (textOver.y >= 180) {
                    textOver.setVelocityY(0);

                    this.tweens.add({
                        targets: scorePlay,
                        duration: 250,
                        alpha: 1
                    });
                    this.time.addEvent({
                        delay: 250,
                        callback: function () {
                            this.tweens.add({
                                targets: timePlay,
                                duration: 250,
                                alpha: 1
                            });
                            this.time.addEvent({
                                delay: 250,
                                callback: function () {
                                    this.tweens.add({
                                        targets: rank,
                                        duration: 250,
                                        alpha: 1
                                    });
                                },
                                callbackScope: this,
                                loop: false,
                            });
                        },
                        callbackScope: this,
                        loop: false,
                    });
                } else {
                    textOver.setVelocityY(600);
                }
            } else {
                paper.setVelocityY(800);
            }
        }
        // if (textOver.y > 100) {
        //     textOver.setVelocityY(0);

        // if (blackGround.y > 140) {
        //     blackGround.setVelocityY(0);
        // }else{
        //     blackGround.setVelocityY(1000);
        // }
        // }

        if (tryAgain.y < 520) {
            tryAgain.setVelocityY(0);
            snowbig.setVelocityY(0);

            paper.setVelocityY(0);
        }
        if (end.y < 610) {
            end.setVelocityY(0);
            snowsmall.setVelocityY(0);
        }
    }
}

export default GameOverArcade;