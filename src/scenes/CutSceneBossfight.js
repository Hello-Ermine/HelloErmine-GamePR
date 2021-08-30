import Phaser from "phaser";

//BG
let foreGround;
let middleGround;
let backGround;
let skybox;
let skybox2;

//Character
let golem;
let ermine;

//Event
let golemEvent;
let changeScene;
let fadeChange;

//Animation
let golemAni;
let ermineAni;
let ermineAniStand;

//Heart
let playerHeart;
//Any
let fade = 0;

class CutSceneBossFight extends Phaser.Scene {
    constructor(test) {
        super({
            key: "CutSceneBossFight",
        });
    }
    init(data){
              playerHeart=data.playerHeart;
    }

    preload() {
        //Background
        this.load.image("foreGround", "src/image/background/FG ermine.png");
        this.load.image("middleGround", "src/image/background/MG ermine.png");
        this.load.image("backGround", "src/image/background/BG ermine.png");
        this.load.image("skyblock", "src/image/background/SkyBlock.png");

        //Character
        this.load.spritesheet(
            "golem",
            "src/image/Character/golem/Golem2_sprite.png",
            { frameWidth: 1000, frameHeight: 1000 }
        );
        this.load.spritesheet(
            "ermine",
            "src/image/Character/ermine/ErmineAll.png",
            { frameWidth: 500, frameHeight: 300 }
        );
        this.load.spritesheet("heart", "src/image/object/heart.png", {
            frameWidth: 64,
            frameHeight: 66,
        });
        this.load.spritesheet("snowball", "src/image/Character/snowball.png", {
            frameWidth: 300,
            frameHeight: 300,
        });
    }

    create() {
        //Show X Y
        this.label = this.add
            .text(0, 0, "(x, y)", { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        this.cameras.main.fadeIn(3000);
        //Create Background
        foreGround = this.add
            .tileSprite(0, 0, 1600, 720, "foreGround")
            .setOrigin(0, 0)
            .setDepth(3000);
        middleGround = this.add
            .tileSprite(0, -300, 1280, 720, "middleGround")
            .setOrigin(0, 0)
            .setDepth(1)
            .setScale(1, 1.5);
        backGround = this.add
            .tileSprite(0, -150, 1280, 720, "backGround")
            .setOrigin(0, 0)
            .setDepth(3);

        skybox = this.physics.add
            .image(0, 0, "skyblock")
            .setScale(5, 0.8)
            .setVisible()
            .setImmovable();
        skybox2 = this.physics.add
            .image(925, 215, "skyblock")
            .setOrigin(0, 0)
            .setScale(0.65, 0.93)
            .setImmovable()
            .setVisible(0)
            .setOffset(290, 280);
        //Character
        //ermine
        ermine = this.physics.add
            .sprite(-100, 360, "ermine")
            .setScale(0.5)
            .setSize(250, 80)
            .setOffset(200, 150);
        this.physics.add.collider(ermine, skybox);
        this.physics.add.collider(ermine, skybox2);
        this.physics.add.collider(ermine, backGround);
        //ermine Aanimation
        ermineAni = this.anims.create({
            key: "ermineAni",
            frames: this.anims.generateFrameNumbers("ermine", {
                start: 0,
                end: 3,
            }),
            duration: 750,
            framerate: 1,
            repeat: -1,
        });
        ermine.anims.play("ermineAni", true);

        ermineAniStand = this.anims.create({
            key: "ermineAniStand",
            frames: this.anims.generateFrameNumbers("ermine", {
                start: 0,
                end: 0,
            }),
            duration: 750,
            framerate: 1,
            repeat: -1,
        });

        //Golem
        golem = this.physics.add
            .sprite(
                this.game.renderer.width + 500,
                this.game.renderer.height / 2 - 100,
                "golem"
            )
            .setScale(0.4)
            .setSize(600, 415)
            .setOffset(190, 500)
            .setImmovable(1);

        //golem Animation
        //Walk
        golemAni = this.anims.create({
            key: "golemAni",
            frames: this.anims.generateFrameNumbers("golem", {
                start: 0,
                end: 3,
            }),
            duration: 750,
            framerate: 1,
            repeat: -1,
            callbackScope: this,
        });
        golem.anims.play("golemAni", true);

        changeScene = this.time.addEvent({
            delay: 1000,
            callback: function () {
                this.scene.start("BossFight",{playerHeart:playerHeart});
                ermineAni.destroy();
                ermineAniStand.destroy();
                golemAni.destroy();
                fade = 0;
            },
            callbackScope: this,
            paused: true,
            loop: true,
        });

        fadeChange = this.time.addEvent({
            delay: 1000,
            callback: function () {
                if (fade == 0) {
                    this.cameras.main.fadeOut(2000);
                    fade++;
                }
                changeScene.paused = false;
            },
            callbackScope: this,
            paused: true,
        });
    }

    update(delta, time) {
        //Show X Y
        this.label.setText("(" + this.pointer.x + ", " + this.pointer.y + ")");

        ermine.depth = ermine.y - (ermine.height - 254);
        golem.depth = golem.y + 75;

        if (ermine.x < 100) {
            ermine.setVelocityX(200);
        } else if (ermine.x >= 200) {
            ermine.setVelocityX(0);
            ermine.setCollideWorldBounds(true);
            ermine.anims.play("ermineAniStand", true);
        }
        if (golem.x > 1000) {
            golem.setVelocityX(-100);
        } else if (golem.x <= 1000) {
            golem.setVelocityX(0);
            golem.anims.stop();
            fadeChange.paused = false;
        }
    }
}

export default CutSceneBossFight;
