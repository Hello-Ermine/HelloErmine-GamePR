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
let nameScale = 0.5;

let congText;
let creditEvent;
let positionText = [
    'Head Game-Development',
    'Head Game-Design',
    'Developer',
    'Character & Story Designer',
    'Background Designer',
    'UI Designer',
    'Sound Effects'
];
let headGame = [
    'Thanatorn Roswan',
    'Sittikorn Boonrungkao',
]
let developer = [
    'Parmat Petin',
    'Thanatorn Roswan'
]
let csDesign = [
    'Piraya Sutthiparinyanon',
    'Vichuta Pipoppinyo',
    'Paphada Rontee',
]
let bgDesign = [
    'Cheraim Charoenchit',
    'Chinnawat Kaewnongsang',
    'Nichakan Sathaphon',
    'Nuttapong Sittapong',
    'Pasit Piyasakullert',
]
let uiDesign = [
    'Sittikorn Boonrungkao'
]
let soundFx = [
    'Nitipoom Suttachai',
    'Trongsit Sinnurak',
    'Cheraim Charoenchit',
    'Nichakan Sathaphon'
]

let def = 12500;
let plus = 350;

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

        //name
        this.load.image("pos1", "src/image/winScene/textPositions01.png");
        this.load.image("pos2", "src/image/winScene/textPositions02.png");
        this.load.image("pos3", "src/image/winScene/textPositions03.png");
        this.load.image("pos4", "src/image/winScene/textPositions04.png");
        this.load.image("pos5", "src/image/winScene/textPositions05.png");
        this.load.image("pos6", "src/image/winScene/textPositions06.png");
        this.load.image("pos7", "src/image/winScene/textPositions07.png")

    }

    create() {
        //Show X Y
        this.label = this.add.text(10, 10, '(x, y)', { fontFamily: '"Monospace"' })
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

        //Congratulations
        this.time.addEvent({
            delay: 1000,
            callback: function () {
                congText = this.add.dynamicBitmapText((this.game.renderer.width / 2) - 300, 210, 'fontZFT', '', 100)
                    .setDepth(10);
                congText.setText(`Congratulations`);
                congText.alpha = 0;

                this.time.addEvent({
                    callback: function () {
                        this.tweens.add({
                            targets: congText,
                            duration: 250,
                            alpha: 1
                        });
                    },
                    callbackScope: this,
                    loop: false,
                });
                this.time.addEvent({
                    delay: 5000,
                    callback: function () {
                        this.tweens.add({
                            targets: congText,
                            duration: 5500,
                            y: this.game.renderer.height
                        });
                    },
                    callbackScope: this,
                    loop: false,
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Development Team
        this.time.addEvent({
            delay: 11000,
            callback: function () {
                this.bitMapText = this.add.dynamicBitmapText((this.game.renderer.width / 2) - (510 / 2), 50, 'fontZFT', '', 70)
                    .setDepth(10);
                this.typewriteBitmapText(`Development Team`);
            },
            callbackScope: this,
            loop: false,
        });

        //Position 1
        this.time.addEvent({
            delay: def + (plus * 0),
            callback: function () {
                let pos1 = this.physics.add.image(340, 200, 'pos1')
                    .setScale(1.5);
                pos1.alpha = 0;

                this.tweens.add({
                    targets: pos1,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Position 2
        this.time.addEvent({
            delay: def + (plus * 1),
            callback: function () {
                let pos2 = this.physics.add.image(930, 203, 'pos2')
                    .setScale(1.5);
                pos2.alpha = 0;

                this.tweens.add({
                    targets: pos2,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Position 3
        this.time.addEvent({
            delay: def + (plus * 2),
            callback: function () {
                let pos3 = this.physics.add.image(340, 325, 'pos3')
                    .setScale(1.5);
                pos3.alpha = 0;

                this.tweens.add({
                    targets: pos3,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Position 4
        this.time.addEvent({
            delay: def + (plus * 3),
            callback: function () {
                let pos4 = this.physics.add.image(930, 368, 'pos4')
                    .setScale(1.5);
                pos4.alpha = 0;

                this.tweens.add({
                    targets: pos4,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Position 5
        this.time.addEvent({
            delay: def + (plus * 4),
            callback: function () {
                let pos5 = this.physics.add.image(340, 480, 'pos5')
                    .setScale(1.5);
                pos5.alpha = 0;

                this.tweens.add({
                    targets: pos5,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Position 6
        this.time.addEvent({
            delay: def + (plus * 5),
            callback: function () {
                let pos6 = this.physics.add.image(930, 580, 'pos6')
                    .setScale(1.5);
                pos6.alpha = 0;

                this.tweens.add({
                    targets: pos6,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Position 7
        this.time.addEvent({
            delay: def + (plus * 6),
            callback: function () {
                let pos7 = this.physics.add.image(340, 620, 'pos7')
                    .setScale(1.5);
                pos7.alpha = 0;

                this.tweens.add({
                    targets: pos7,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

    }

    update(delta, time) {
        //Show X Y
        this.label.setText(` ${this.pointer.x} | ${this.pointer.y} | ${delta} | `);

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