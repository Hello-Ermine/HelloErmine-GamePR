import Phaser from "phaser";
import { Zone } from "phaser/src/gameobjects";


//BG
let bgView;
let bgSky;

//camp
let campFire;
let campFireAni;

let typewriter;

let bitMapText;

class WinScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'WinScene'
        });
    }

    preload() {
        //Background
        this.load.image("bgView", "src/image/winScene/bgCampFire.jpg");
        this.load.image("bgSky", "src/image/winScene/skyCampFire.jpg");

        //Camp fire
        this.load.spritesheet('campFire', 'src/image/winScene/camp fire.png',
            { frameWidth: 800, frameHeight: 600 });

        //button
        this.load.image("endWin", "src/image/button/end.png");

        //font
        this.load.bitmapFont('fontZFT', 'src/image/object/ZFT_0.png', 'src/fonts/ZFT_3/ZFT.fnt');

    }

    create() {
        //Show X Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        //fade
        this.cameras.main.fadeIn(2000);

        bgSky = this.add.image(0, 0, 'bgSky')
            .setOrigin(0);

        bgView = this.add.image(0, 0, 'bgView')
            .setOrigin(0);

        campFire = this.physics.add.sprite(this.game.renderer.width / 2, (this.game.renderer.height / 2) + 110, 'campFire')
            .setScale(0.18);

        campFireAni = this.anims.create({
            key: 'campFireAni',
            frames: this.anims.generateFrameNumbers('campFire', {
                start: 0,
                end: 2
            }),
            duration: 750,
            loop: true,
            repeat: -1
        })
        campFire.anims.play('campFireAni', true);


        let headText = this.add.dynamicBitmapText(50, 100, 'fontZFT', '', 60)
            .setDepth(10);
        headText.setText(`Game Development`);

        this.bitMapText = this.add.dynamicBitmapText(50, 150, 'fontZFT', '', 50)
            .setDepth(100);

        this.typewriteBitmapText(`Thanatorn Roswan \n
        Thanatorn Roswan \n
        Thanatorn Roswan \n
        Thanatorn Roswan \n`);

        

    }

    update(delta, time) {
        //Show X Y
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');

        this.time.addEvent({
            delay: 2500,
            callback: function () {

                if (bgView.y < 25) {
                    bgView.y++;
                    campFire.y++;
                } else if (bgView.y < 1000) {
                    bgView.y += 1.5;
                    campFire.y += 1.5;
                }
            },
            callbackScope: this,
            loop: false,
        });

        if (bgView.y > 1000) {
            campFire.destroy();
            bgView.destroy();
        }
    }

    typewriteBitmapText(text) {
        this.bitMapText.setText(text)

        const bounds = this.bitMapText.getTextBounds(false)
        const wrappedText = bounds['wrappedText'] || text

        this.bitMapText.setText('')

        const length = wrappedText.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.bitMapText.text += wrappedText[i]
                ++i
            },
            repeat: length - 1,
            delay: 50
        })
    }


}

export default WinScene;