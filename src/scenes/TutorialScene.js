import Phaser from "phaser";

let BgToturial;
let board;
let info;
let showInfo;
let tutorialEvent;
let count = 0;

class TutorialScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'TutorialScene'
        });
    }

    preload() {
        this.load.image('BgToturial', 'src/image/tutorialScene/BG.png');
        this.load.image('board', 'src/image/tutorialScene/board.png');
        this.load.image('info', 'src/image/tutorialScene/infomation01.png');
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
        info = this.physics.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'info');
        info.alpha = 0;

        BgToturial.on('pointerup', () => {
            this.cameras.main.fadeOut(500);
            tutorialEvent = this.time.addEvent({  
                delay: 500,
                callback: function(){
                    this.scene.start('MainMenu');
                },
                callbackScope: this,
                loop: false,

            })
            
        })

    }

    update(delta, time) {
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');

        if (board.y < 380) {
            board.setVelocityY(0);
            if(count == 0)
            count++;
            this.tweens.add({
                targets: info,
                duration: 500,
                alpha: 1
            });
        }
        count = 0;

    }
}

export default TutorialScene;
