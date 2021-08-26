import Phaser from "phaser";

//BG
let foreGround;
let middleGround;
let backGround;
let skybox;

//Character
let golem;
let ermine;

//Event
let golemEvent;
let golemATKEvent;
let snowballEvent;

//Controller
let keyW;
let keyA;
let keyS;
let keyD;
let keyAtk;

//Animation
let golemAni;
let golemATK;
let snowballAni;
let ermineAni;
let HeartAni;

//Object
let snowball;
let heart;

//Group
let snowballgroup;
let heartGroup;

//Any
let countATK = 0;
let playerHeart = 3;

let open = 0;

class BossFight extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BossFight'
        });
    }

    preload() {
        this.load.image("foreGround", "src/image/background/FG ermine.png");
        this.load.image("middleGround", "src/image/background/MG ermine.png");
        this.load.image("backGround", "src/image/background/BG ermine.png");
        this.load.image("skyblock", "src/image/background/SkyBlock.png");

        //Character
        this.load.spritesheet('golem', 'src/image/Character/golem/Golem2_sprite.png', { frameWidth: 1000, frameHeight: 1000 });
        this.load.spritesheet("ermine", "src/image/Character/ermine/ErmineAll.png", { frameWidth: 500, frameHeight: 300, });
        this.load.spritesheet("heart", "src/image/object/heart.png", { frameWidth: 64, frameHeight: 66, });
        this.load.spritesheet("snowball", "src/image/Character/snowball.png", { frameWidth: 300, frameHeight: 300, });

    }

    create() {
        //Show X Y
        this.label = this.add.text(0, 0, "(x, y)", { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        this.cameras.main.fadeIn(3000);
        //Create Background
        foreGround = this.add.tileSprite(0, 0, 1600, 720, "foreGround")
            .setOrigin(0, 0)
            .setDepth(3000);
        middleGround = this.add.tileSprite(0, -300, 1280, 720, "middleGround")
            .setOrigin(0, 0)
            .setDepth(1)
            .setScale(1, 1.5);
        backGround = this.add.tileSprite(0, -150, 1280, 720, "backGround")
            .setOrigin(0, 0)
            .setDepth(3);

        skybox = this.physics.add.image(0, 0, "skyblock")
            .setScale(5, 0.8)
            .setVisible()
            .setImmovable();


        //Object
        //Snow-Ball
        //SnowBall Animation
        snowballAni = this.anims.create({
            key: "snowballAni",
            frames: this.anims.generateFrameNumbers("snowball", {
                start: 0,
                end: 2,
            }),
            duration: 750,
            framerate: 1,
            repeat: -1,
        });

        //Group
        snowballgroup = this.physics.add.group();

        //Heart Group
        heartGroup = this.physics.add.group();

        //heart Animation
        HeartAni = this.anims.create({
            key: "heartAni",
            frames: this.anims.generateFrameNumbers("heart", {
                start: 0,
                end: 7,
            }),
            duration: 450,
            framerate: 60,
            repeat: -1,
        });

        //Heart
        for (let i = 0; i < playerHeart; i++) {
            heart = this.physics.add.sprite(30 + i * 45, 250, "heart")
                .setDepth(100000)
                .setScale(0.75);
            heartGroup.add(heart);
            heart.anims.play("heartAni", true);
        }

        //Character
        //ermine
        ermine = this.physics.add.sprite(-100, 360, "ermine")
            .setScale(0.5)
            .setSize(250, 80)
            .setOffset(200, 150);
        this.physics.add.collider(ermine, skybox);
        this.physics.add.collider(ermine, backGround);
        //ermine Aanimation
        ermineAni = this.anims.create({
            key: "ermineAni",
            frames: this.anims.generateFrameNumbers("ermine", {
                start: 0,
                end: 3
            }),
            duration: 750,
            framerate: 1,
            repeat: -1,
        });
        ermine.anims.play("ermineAni", true);
        ermine.setCollideWorldBounds(false);
        ermine.immortal = false;

        //Golem
        golem = this.physics.add.sprite(this.game.renderer.width / 2 + 400, this.game.renderer.height / 2 - 100, "golem")
            .setScale(0.4)
            .setSize(600, 300)
            .setOffset(250, 500)
            .setVelocityY(-100);

        this.physics.add.collider(golem, skybox, () => {
            golem.setVelocityY(100);
        });
        this.physics.add.overlap(ermine, golem, () => {
            if (ermine.immortal == false) {
                playerHeart--;
                if (playerHeart <= 0) {
                    ermine.immortal = true;
                    snowballEvent.paused = true;
                    this.cameras.main.fadeOut(2000);
                    this.time.addEvent({
                        delay: 2000,
                        callback: function () {
                            this.scene.start("GameOver");
                            snowballAni.destroy();
                            // snowmanAni.destroy();
                            ermineAni.destroy();
                            // ermineAniATK.destroy();
                            HeartAni.destroy();
                            this.input.keyboard.removeKey(
                                Phaser.Input.Keyboard.KeyCodes.W
                            );
                            this.input.keyboard.removeKey(
                                Phaser.Input.Keyboard.KeyCodes.A
                            );
                            this.input.keyboard.removeKey(
                                Phaser.Input.Keyboard.KeyCodes.S
                            );
                            this.input.keyboard.removeKey(
                                Phaser.Input.Keyboard.KeyCodes.D
                            );
                            this.input.keyboard.removeKey(
                                Phaser.Input.Keyboard.KeyCodes.SPACE
                            );
                            playerHeart = 3;
                        },
                        callbackScope: this,
                        loop: false,
                        paused: false,
                    });
                }
                for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                    if (playerHeart < i + 1) {
                        heartGroup.getChildren()[i].setVisible(false);
                    } else {
                        heartGroup.getChildren()[i].setVisible(true);
                    }
                }
            }
            ermine.immortal = true;
            ermine.flickerTimer = this.time.addEvent({
                delay: 100,
                callback: function () {
                    ermine.setVisible(!ermine.visible);
                    if (ermine.flickerTimer.repeatCount == 0) {
                        ermine.immortal = false;
                        ermine.setVisible(true);
                        ermine.flickerTimer.remove();
                    }
                },
                repeat: 15,
            });  //--------------------------------
        });

        //Set Walk Way
        golem.setCollideWorldBounds(true);
        golem.body.onWorldBounds = true;
        golem.body.world.on('worldbounds', function (body) {
            if (body.gameObject === this) {
                golem.setVelocityY(-100);
            }
        }, golem);

        //golem Animation
        //Walk
        golemAni = this.anims.create({
            key: "golemAni",
            frames: this.anims.generateFrameNumbers("golem", {
                start: 0,
                end: 3
            }),
            duration: 750,
            framerate: 1,
            repeat: -1,
        });
        golem.anims.play("golemAni", true);

        //ATK
        golemATK = this.anims.create({
            key: "golemATK",
            frames: this.anims.generateFrameNumbers("golem", {
                start: 4,
                end: 8
            }),
            duration: 1000,
            framerate: 10,
            repeat: -1
        });
        // Golem Event
        golemATKEvent = this.time.addEvent({
            delay: Phaser.Math.RND.pick([1000, 2000, 3000, 4000, 5000]),
            callback: function () {
                countATK = golemATKEvent.delay / golemATK.duration;
                golemATKEvent.delay = Phaser.Math.RND.pick([1000, 2000, 3000, 4000, 5000]);
                if (golem.anims.currentAnim.key === 'golemAni') {
                    golem.anims.play("golemATK", true);
                    golem.setVelocityY(0);
                    //snowball
                    switch (countATK) {
                        case 1:
                            snowballEvent = this.time.addEvent({
                                delay: 1000,
                                callback: function () {
                                    snowball = this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                                        .setScale(0.65)
                                        .setSize(230, 60)
                                        .setOffset(30, 220);
                                    snowballgroup.add(snowball);
                                    snowball.setVelocityX(Phaser.Math.Between(-200, -500));
                                    snowball.anims.play("snowballAni", true);
                                    snowball.depth = snowball.y;
                                    console.log(snowballgroup.getChildren());
                                    this.physics.add.overlap(ermine, snowball, () => {
                                        if (ermine.immortal == false) {
                                            playerHeart--;
                                            if (playerHeart <= 0) {
                                                ermine.immortal = true;
                                                snowballEvent.paused = true;
                                                this.cameras.main.fadeOut(2000);
                                                this.time.addEvent({
                                                    delay: 2000,
                                                    callback: function () {
                                                        this.scene.start("GameOver");
                                                        snowballAni.destroy();
                                                        // snowmanAni.destroy();
                                                        ermineAni.destroy();
                                                        // ermineAniATK.destroy();
                                                        HeartAni.destroy();
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.W
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.A
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.S
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.D
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.SPACE
                                                        );
                                                        playerHeart = 3;
                                                    },
                                                    callbackScope: this,
                                                    loop: false,
                                                    paused: false,
                                                });
                                            }
                                            for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                                                if (playerHeart < i + 1) {
                                                    heartGroup.getChildren()[i].setVisible(false);
                                                } else {
                                                    heartGroup.getChildren()[i].setVisible(true);
                                                }
                                            }
                                        }
                                        ermine.immortal = true;
                                        ermine.flickerTimer = this.time.addEvent({
                                            delay: 100,
                                            callback: function () {
                                                ermine.setVisible(!ermine.visible);
                                                if (ermine.flickerTimer.repeatCount == 0) {
                                                    ermine.immortal = false;
                                                    ermine.setVisible(true);
                                                    ermine.flickerTimer.remove();
                                                }
                                            },
                                            repeat: 15,
                                        });
                                    });
                                },
                                callbackScope: this,
                                loop: false,
                                paused: false,
                                repeat: 1
                            });
                        case 2:
                            snowballEvent = this.time.addEvent({
                                delay: 1000,
                                callback: function () {
                                    snowball = this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                                        .setScale(0.65)
                                        .setSize(230, 60)
                                        .setOffset(30, 220);
                                    snowballgroup.add(snowball);
                                    snowball.setVelocityX(Phaser.Math.Between(-200, -500));
                                    snowball.anims.play("snowballAni", true);
                                    snowball.depth = snowball.y;
                                    console.log(snowballgroup.getChildren());
                                    this.physics.add.overlap(ermine, snowball, () => {
                                        if (ermine.immortal == false) {
                                            playerHeart--;
                                            if (playerHeart <= 0) {
                                                ermine.immortal = true;
                                                snowballEvent.paused = true;
                                                this.cameras.main.fadeOut(2000);
                                                this.time.addEvent({
                                                    delay: 2000,
                                                    callback: function () {
                                                        this.scene.start("GameOver");
                                                        snowballAni.destroy();
                                                        // snowmanAni.destroy();
                                                        ermineAni.destroy();
                                                        // ermineAniATK.destroy();
                                                        HeartAni.destroy();
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.W
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.A
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.S
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.D
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.SPACE
                                                        );
                                                        playerHeart = 3;
                                                    },
                                                    callbackScope: this,
                                                    loop: false,
                                                    paused: false,
                                                });
                                            }
                                            for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                                                if (playerHeart < i + 1) {
                                                    heartGroup.getChildren()[i].setVisible(false);
                                                } else {
                                                    heartGroup.getChildren()[i].setVisible(true);
                                                }
                                            }
                                        }
                                        ermine.immortal = true;
                                        ermine.flickerTimer = this.time.addEvent({
                                            delay: 100,
                                            callback: function () {
                                                ermine.setVisible(!ermine.visible);
                                                if (ermine.flickerTimer.repeatCount == 0) {
                                                    ermine.immortal = false;
                                                    ermine.setVisible(true);
                                                    ermine.flickerTimer.remove();
                                                }
                                            },
                                            repeat: 15,
                                        });
                                    });
                                },
                                callbackScope: this,
                                loop: false,
                                paused: false,
                                repeat: 1
                            });
                        case 3:
                            snowballEvent = this.time.addEvent({
                                delay: 1000,
                                callback: function () {
                                    snowball = this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                                        .setScale(0.65)
                                        .setSize(230, 60)
                                        .setOffset(30, 220);
                                    snowballgroup.add(snowball);
                                    snowball.setVelocityX(Phaser.Math.Between(-200, -500));
                                    snowball.anims.play("snowballAni", true);
                                    snowball.depth = snowball.y;
                                    console.log(snowballgroup.getChildren());
                                    this.physics.add.overlap(ermine, snowball, () => {
                                        if (ermine.immortal == false) {
                                            playerHeart--;
                                            if (playerHeart <= 0) {
                                                ermine.immortal = true;
                                                snowballEvent.paused = true;
                                                this.cameras.main.fadeOut(2000);
                                                this.time.addEvent({
                                                    delay: 2000,
                                                    callback: function () {
                                                        this.scene.start("GameOver");
                                                        snowballAni.destroy();
                                                        // snowmanAni.destroy();
                                                        ermineAni.destroy();
                                                        // ermineAniATK.destroy();
                                                        HeartAni.destroy();
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.W
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.A
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.S
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.D
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.SPACE
                                                        );
                                                        playerHeart = 3;
                                                    },
                                                    callbackScope: this,
                                                    loop: false,
                                                    paused: false,
                                                });
                                            }
                                            for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                                                if (playerHeart < i + 1) {
                                                    heartGroup.getChildren()[i].setVisible(false);
                                                } else {
                                                    heartGroup.getChildren()[i].setVisible(true);
                                                }
                                            }
                                        }
                                        ermine.immortal = true;
                                        ermine.flickerTimer = this.time.addEvent({
                                            delay: 100,
                                            callback: function () {
                                                ermine.setVisible(!ermine.visible);
                                                if (ermine.flickerTimer.repeatCount == 0) {
                                                    ermine.immortal = false;
                                                    ermine.setVisible(true);
                                                    ermine.flickerTimer.remove();
                                                }
                                            },
                                            repeat: 15,
                                        });
                                    });
                                },
                                callbackScope: this,
                                loop: false,
                                paused: false,
                                repeat: 1
                            });
                        case 4:
                            snowballEvent = this.time.addEvent({
                                delay: 1000,
                                callback: function () {
                                    snowball = this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                                        .setScale(0.65)
                                        .setSize(230, 60)
                                        .setOffset(30, 220);
                                    snowballgroup.add(snowball);
                                    snowball.setVelocityX(Phaser.Math.Between(-200, -500));
                                    snowball.anims.play("snowballAni", true);
                                    snowball.depth = snowball.y;
                                    console.log(snowballgroup.getChildren());
                                    this.physics.add.overlap(ermine, snowball, () => {
                                        if (ermine.immortal == false) {
                                            playerHeart--;
                                            if (playerHeart <= 0) {
                                                ermine.immortal = true;
                                                snowballEvent.paused = true;
                                                this.cameras.main.fadeOut(2000);
                                                this.time.addEvent({
                                                    delay: 2000,
                                                    callback: function () {
                                                        this.scene.start("GameOver");
                                                        snowballAni.destroy();
                                                        // snowmanAni.destroy();
                                                        ermineAni.destroy();
                                                        // ermineAniATK.destroy();
                                                        HeartAni.destroy();
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.W
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.A
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.S
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.D
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.SPACE
                                                        );
                                                        playerHeart = 3;
                                                    },
                                                    callbackScope: this,
                                                    loop: false,
                                                    paused: false,
                                                });
                                            }
                                            for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                                                if (playerHeart < i + 1) {
                                                    heartGroup.getChildren()[i].setVisible(false);
                                                } else {
                                                    heartGroup.getChildren()[i].setVisible(true);
                                                }
                                            }
                                        }
                                        ermine.immortal = true;
                                        ermine.flickerTimer = this.time.addEvent({
                                            delay: 100,
                                            callback: function () {
                                                ermine.setVisible(!ermine.visible);
                                                if (ermine.flickerTimer.repeatCount == 0) {
                                                    ermine.immortal = false;
                                                    ermine.setVisible(true);
                                                    ermine.flickerTimer.remove();
                                                }
                                            },
                                            repeat: 15,
                                        });
                                    });
                                },
                                callbackScope: this,
                                loop: false,
                                paused: false,
                                repeat: 1
                            });
                        case 5:
                            snowballEvent = this.time.addEvent({
                                delay: 1000,
                                callback: function () {
                                    snowball = this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                                        .setScale(0.65)
                                        .setSize(230, 60)
                                        .setOffset(30, 220);
                                    snowballgroup.add(snowball);
                                    snowball.setVelocityX(Phaser.Math.Between(-200, -500));
                                    snowball.anims.play("snowballAni", true);
                                    snowball.depth = snowball.y;
                                    console.log(snowballgroup.getChildren());
                                    this.physics.add.overlap(ermine, snowball, () => {
                                        if (ermine.immortal == false) {
                                            playerHeart--;
                                            if (playerHeart <= 0) {
                                                ermine.immortal = true;
                                                snowballEvent.paused = true;
                                                this.cameras.main.fadeOut(2000);
                                                this.time.addEvent({
                                                    delay: 2000,
                                                    callback: function () {
                                                        this.scene.start("GameOver");
                                                        snowballAni.destroy();
                                                        // snowmanAni.destroy();
                                                        ermineAni.destroy();
                                                        // ermineAniATK.destroy();
                                                        HeartAni.destroy();
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.W
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.A
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.S
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.D
                                                        );
                                                        this.input.keyboard.removeKey(
                                                            Phaser.Input.Keyboard.KeyCodes.SPACE
                                                        );
                                                        playerHeart = 3;
                                                    },
                                                    callbackScope: this,
                                                    loop: false,
                                                    paused: false,
                                                });
                                            }
                                            for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                                                if (playerHeart < i + 1) {
                                                    heartGroup.getChildren()[i].setVisible(false);
                                                } else {
                                                    heartGroup.getChildren()[i].setVisible(true);
                                                }
                                            }
                                        }
                                        ermine.immortal = true;
                                        ermine.flickerTimer = this.time.addEvent({
                                            delay: 100,
                                            callback: function () {
                                                ermine.setVisible(!ermine.visible);
                                                if (ermine.flickerTimer.repeatCount == 0) {
                                                    ermine.immortal = false;
                                                    ermine.setVisible(true);
                                                    ermine.flickerTimer.remove();
                                                }
                                            },
                                            repeat: 15,
                                        });
                                    });
                                },
                                callbackScope: this,
                                loop: false,
                                paused: false,
                                repeat: 1
                            });
                    }
                }
                else {
                    golem.anims.play("golemAni", true);
                    if (golem.setVelocityY < 0) {
                        golem.setVelocityY(100);
                    }
                    else if (golem.setVelocityY > 0) {
                        golem.setVelocityY(-100);
                    }
                    else {

                        if (golem.y < this.game.renderer.height / 2) {
                            golem.setVelocityY(100);
                        }
                        if (golem.y > this.game.renderer.height / 2) {
                            golem.setVelocityY(-100);
                        }
                    }

                }
            },
            callbackScope: this,
            loop: true,
            paused: false
        });

        //Player Control
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyAtk = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    }

    update(delta, time) {
        //Show X Y
        this.label.setText("(" + this.pointer.x + ", " + this.pointer.y + ")" + " | " + golem.height + " | " + golem.y + " | " + golem.depth);

        ermine.depth = ermine.y - (ermine.height - 254);
        golem.depth = golem.y + 75;

        for (let i = 0; i < snowballgroup.getChildren().length; i++) {
            if (snowballgroup.getChildren()[i].x < 0) {
                snowballgroup.getChildren()[i].destroy();
            }
        }

        if (playerHeart <= 0) {
            ermine.setVelocityX(-100);
        }

        if (open == 1) {
            if (playerHeart > 0) {
                if (keyW.isDown) {
                    ermine.setVelocityY(-200);
                } else if (keyS.isDown) {
                    ermine.setVelocityY(200);
                } else {
                    ermine.setVelocityY(0);
                }
                if (keyA.isDown) {
                    ermine.setVelocityX(-300);
                } else if (keyD.isDown) {
                    ermine.setVelocityX(300);
                } else {
                    ermine.setVelocityX(0);
                }
                if (keyAtk.isDown) {
                    // ermine.anims.play("ermineAniATK", true);
                } else {
                    // ermine.anims.play("ermineAni", true);
                }
            }
        } else if (open == 0) {
            if (ermine.x < 100 && playerHeart > 0) {
                ermine.setVelocityX(200);
            }
            else if (ermine.x >= 200 && playerHeart > 0) {
                ermine.setVelocityX(0);
                ermine.setCollideWorldBounds(true);
                open = 1;
            }
        }



    }
}

export default BossFight;