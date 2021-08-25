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
let keyS;
let keyAtk;

//Animation
let golemAni;
let golemATK;
let snowballAni;
let ermineAni;

//Object
let snowball=[];
let heart;

//Group
let snowballgroup;

//Any
let countATK=0;

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
        this.load.spritesheet('golem', 'src/image/Character/golem/Golem2_sprite.png', { frameWidth: 1000, frameHeight: 1000});
        this.load.spritesheet("ermine", "src/image/Character/ermine/ErmineAll.png", { frameWidth: 500, frameHeight: 300, });
        this.load.spritesheet("heart", "src/image/heart.png", { frameWidth: 64, frameHeight: 66, });
        this.load.spritesheet("snowball", "src/image/snowball.png", { frameWidth: 300, frameHeight: 300, });

    }

    create() {
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
        snowballAni= this.anims.create({
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
        snowballgroup=this.physics.add.group();

        //Character
        //ermine
        ermine = this.physics.add.sprite(-100, 360, "ermine")
            .setScale(0.5)
            .setSize(250, 80)
            .setOffset(200, 150);
        this.physics.add.collider(ermine, skybox);
        this.physics.add.collider(ermine, backGround);
        //ermine Aanimation
        ermineAni=this.anims.create({
            key:"ermineAni",
            frames: this.anims.generateFrameNumbers("ermine",{
                start:0,
                end:3
            }),
            duration:750,
            framerate:1,
            repeat:-1,
        });
        ermine.anims.play("ermineAni",true);
        ermine.setCollideWorldBounds(false);
        //set Walk in

        //Golem
        golem=this.physics.add.sprite(this.game.renderer.width / 2 +400,this.game.renderer.height / 2-100,"golem")
                    .setScale(0.4)
                    .setSize(600,300)
                    .setOffset(250,500)
                    .setDepth(3)
                    .setVelocityY(-100);
        this.physics.add.collider(golem,skybox,()=>{
            golem.setVelocityY(100);
        });

        //Set Walk Way
        golem.setCollideWorldBounds(true);
        golem.body.onWorldBounds = true;
        golem.body.world.on('worldbounds', function(body) {
            if (body.gameObject === this) {
              golem.setVelocityY(-100);
            }
          }, golem);

        //golem Animation

        //Walk
        golemAni=this.anims.create({
            key:"golemAni",
            frames: this.anims.generateFrameNumbers("golem",{
                start:0,
                end:3
            }),
            duration:750,
            framerate:1,
            repeat:-1,
        });
        golem.anims.play("golemAni",true);

        //ATK
        golemATK=this.anims.create({
            key:"golemATK",
            frames: this.anims.generateFrameNumbers("golem",{
                start:4,
                end: 8
            }),
            duration:1000,
            framerate:10,
            repeat:-1
        });
        // Golem Event
        golemATKEvent=this.time.addEvent({
            delay: Phaser.Math.RND.pick([1000,2000,3000,4000,5000]),//6000,7000,8000,9000,10000]),//Phaser.Math.Between(1000,10000)
            callback: function(){
                golemATKEvent.delay=Phaser.Math.RND.pick([1000,2000,3000,4000,5000]);//,6000,7000,8000,9000,10000]);
                countATK=golemATKEvent.delay/golemATK.duration;
                if(golem.anims.currentAnim.key === 'golemAni'){
                    golem.anims.play("golemATK",true);
                    golem.setVelocityY(0);
                    console.log(countATK);
                    //snowball
                    switch(countATK){
                        case 1:// 5 snowball
                            for(let i=0;i<5;i++){
                                snowball[i]=this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                                    .setScale(0.65)
                                    .setSize(230, 60)
                                    .setOffset(30, 220);
                                    snowballgroup.add(snowball[i]);
                                }
                                
                            this.time.addEvent({
                                delay:1000,
                                callback: function(){
                                    for(let i=0;i<5;i++){
                                        snowball[i].setVelocityX(Phaser.Math.Between(-200, -500));
                                        snowball[i].anims.play("snowballAni",true);
                                        snowball[i].depth=snowball[i].y;
                                    }
                                },
                            });

                        case 2:
                            for(let i=0;i<5;i++){
                                snowball[i]=this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                                    .setScale(0.65)
                                    .setSize(230, 60)
                                    .setOffset(30, 220);
                                    snowballgroup.add(snowball[i]);
                                }
                            this.time.addEvent({
                                delay:1000,
                                callback: function(){
                                    for(let i=0;i<5;i++){
                                        snowball[i].setVelocityX(Phaser.Math.Between(-200, -500));
                                        snowball[i].anims.play("snowballAni",true);
                                        snowball[i].depth=snowball[i].y;
                                    }
                                },

                            });
                        case 3:
                            for(let i=0;i<5;i++){
                                snowball[i]=this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                                    .setScale(0.65)
                                    .setSize(230, 60)
                                    .setOffset(30, 220);
                                    snowballgroup.add(snowball[i]);
                                }
                                
                            this.time.addEvent({
                                delay:1000,
                                callback: function(){
                                    for(let i=0;i<5;i++){
                                        snowball[i].setVelocityX(Phaser.Math.Between(-200, -500));
                                        snowball[i].anims.play("snowballAni",true);
                                        snowball[i].depth=snowball[i].y;
                                    }
                                },

                            });
                        case 4:
                            for(let i=0;i<5;i++){
                                snowball[i]=this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                                    .setScale(0.65)
                                    .setSize(230, 60)
                                    .setOffset(30, 220);
                                    snowballgroup.add(snowball[i]);
                                }
                                
                            this.time.addEvent({
                                delay:1000,
                                callback: function(){
                                    for(let i=0;i<5;i++){
                                        snowball[i].setVelocityX(Phaser.Math.Between(-200, -500));
                                        snowball[i].anims.play("snowballAni",true);
                                        snowball[i].depth=snowball[i].y;
                                    }
                                },

                            });
                        case 5:
                            for(let i=0;i<5;i++){
                                snowball[i]=this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                                    .setScale(0.65)
                                    .setSize(230, 60)
                                    .setOffset(30, 220);
                                    snowballgroup.add(snowball[i]);
                                }
                                
                            this.time.addEvent({
                                delay:1000,
                                callback: function(){
                                    for(let i=0;i<5;i++){
                                        snowball[i].setVelocityX(Phaser.Math.Between(-200, -500));
                                        snowball[i].anims.play("snowballAni",true);
                                        snowball[i].depth=snowball[i].y;
                                    }
                                },

                            });
                        }
                    }
                else{
                    golem.anims.play("golemAni",true);
                    if(golem.setVelocityY<0){
                        golem.setVelocityY(100);
                    }
                    else if(golem.setVelocityY>0){
                        golem.setVelocityY(-100);
                    }
                    else{

                        if(golem.y<this.game.renderer.height/2){
                            golem.setVelocityY(100);
                        }
                        if(golem.y>this.game.renderer.height/2){
                            golem.setVelocityY(-100);
                        }
                    }

                }
            },
            callbackScope:this,
            loop: true,
            paused: false
        });

        //Player Control
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyAtk = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        
    }

    update(delta, time) {
        ermine.depth = ermine.y - (ermine.height - 254);

        for (let i = 0; i < snowballgroup.getChildren().length; i++) {
            if (snowballgroup.getChildren()[i].x < 0) {
                snowballgroup.getChildren()[i].destroy();
            }
        }

        if (keyW.isDown) {
            ermine.setVelocityY(-200);
        } else if (keyS.isDown) {
            ermine.setVelocityY(200);
        } else {
            ermine.setVelocityY(0);
        }

        if(ermine.x<100){
            ermine.setVelocityX(200);
        }
        else if(ermine.x>=200){
            ermine.setVelocityX(0);
            ermine.setCollideWorldBounds(true);
        }
    }
}

export default BossFight;
