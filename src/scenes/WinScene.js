import Phaser from "phaser";

let BGOver;
let win;
let bow;
let empStar;

//star
let starL;
let starM;
let starR;
let endWin;

class WinScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'WinScene'
        });
    }

    preload() {
        this.load.image("BGOver", "src/image/background/fullBG.png");
        this.load.image("win", "src/image/winScene/winConvert.png");
        this.load.image("bow", "src/image/winScene/bowConvert.png");

        //star
        this.load.image("empStar", "src/image/winScene/emptyStarConvert.png");
        this.load.image("starL", "src/image/winScene/starLConvert.png");
        this.load.image("starM", "src/image/winScene/starMConvert.png");
        this.load.image("starR", "src/image/winScene/starRConvert.png");

        //button
        this.load.image("endWin", "src/image/button/end.png");

    }

    create() {
        //Show X Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        this.cameras.main.fadeIn(2000);

        BGOver = this.add.image(0, 0, 'BGOver')
            .setOrigin(0, 0);
        win = this.physics.add.image(this.game.renderer.width / 2, (this.game.renderer.height / 2) + 75, 'win')
            .setDepth(1)
            .setScale(3);
        win.alpha = 0;
        bow = this.physics.add.image(this.game.renderer.width / 2, (this.game.renderer.height / 2) + 75, 'bow')
            .setScale(1.3)
            .setScale(0);
        bow.alpha = 0;

        empStar = this.physics.add.image(this.game.renderer.width / 2, (this.game.renderer.height / 2) - 100, 'empStar')
            .setDepth(1);
        empStar.alpha = 0;;

        starL = this.physics.add.image((this.game.renderer.width / 2), 600, 'starL')
            .setDepth(1)
            .setScale(3);
        starL.alpha = 0;
        starM = this.physics.add.image((this.game.renderer.width / 2), 600, 'starM')
            .setDepth(1)
            .setScale(3);
        starM.alpha = 0;
        starR = this.physics.add.image((this.game.renderer.width / 2), 600, 'starR')
            .setDepth(1)
            .setScale(3);
        starR.alpha = 0;

        //Bow
        this.time.addEvent({
            delay: 1000,
            callback: function () {
                this.tweens.add({
                    targets: bow,
                    duration: 250,
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1,
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Win
        this.time.addEvent({
            delay: 1500,
            callback: function () {
                this.tweens.add({
                    targets: win,
                    duration: 250,
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1,
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Star Left
        this.time.addEvent({
            delay: 2000,
            callback: function () {
                this.tweens.add({
                    targets: starL,
                    duration: 250,
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1,
                    x: (this.game.renderer.width / 2) - 122,
                    y: (this.game.renderer.height / 2) - 70,
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Star Midle
        this.time.addEvent({
            delay: 2500,
            callback: function () {
                this.tweens.add({
                    targets: starM,
                    duration: 250,
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1,
                    x: (this.game.renderer.width / 2),
                    y: (this.game.renderer.height / 2) - 107,
                });
            },
            callbackScope: this,
            loop: false,
        });

        //star Right
        this.time.addEvent({
            delay: 3000,
            callback: function () {
                this.tweens.add({
                    targets: starR,
                    duration: 250,
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1,
                    x: (this.game.renderer.width / 2) + 122,
                    y: (this.game.renderer.height / 2) - 70,
                });
            },
            callbackScope: this,
            loop: false,
        });

        endWin = this.physics.add.image(this.game.renderer.width / 2, 575, 'endWin')
            .setScale(0.47)
            .setDepth(100)
            .setInteractive();
        endWin.alpha = 0;

        //button tween
        this.time.addEvent({
            delay: 3500,
            callback: function () {
                this.tweens.add({
                    targets: endWin,
                    duration: 1000,
                    alpha: 1,
                });
            },
            callbackScope: this,
            loop: false,
        });

        endWin.on('pointerover', () => {
            endWin.setScale(0.52);
        })
        endWin.on('pointerout', () => {
            endWin.setScale(0.47);
        })

        endWin.on('pointerup', () => {
            this.cameras.main.fadeOut(500)
            this.time.addEvent({
                delay: 500,
                callback: function () {
                    location.reload();
                },
                callbackScope: this,
                loop: false,
            });
        });

    }

    update(delta, time) {
        //Show X Y
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');




    }
}

export default WinScene;