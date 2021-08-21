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

//Animation
let golemAni;
let golemATK;

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
        this.load.spritesheet('golem', 'src/image/Demo2/Demo2/Golem2_sprite.png', { frameWidth: 1000, frameHeight: 1000});
        this.load.spritesheet("ermine", "src/image/ErmineAll.png", { frameWidth: 500, frameHeight: 300, });

    }

    create() {
        //Create Background
        foreGround = this.add.tileSprite(0, 0, 1600, 720, "foreGround")
            .setOrigin(0, 0)
            .setDepth(3000);
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

        //Character
        //ermine
        ermine = this.physics.add.sprite(190, 360, "ermine")
            .setScale(0.5)
            .setSize(250, 80)
            .setOffset(200, 150);
        this.physics.add.collider(ermine, skybox);
        this.physics.add.collider(ermine, backGround);
        ermine.setCollideWorldBounds(true);
        //Golem
        golem=this.physics.add.sprite(this.game.renderer.width / 2 +400,this.game.renderer.height / 2-100,"golem")
                    .setScale(0.4)
                    .setSize(600,300)
                    .setOffset(250,500)
                    .setDepth(100)
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
            duration:900,
            framerate:1,
            repeat:-1
        });
        
        // Golem Event
        golemATKEvent=this.time.addEvent({
            delay: 1000,
            callback: function(){
                if(golem.anims.currentAnim.key === 'golemAni'){
                    golem.anims.play("golemATK",true);
                    golem.setVelocityY(0);
                // console.log("wows");
                    // golem.anims.stop("golemATK");
                }
                else{
                    golem.anims.play("golemAni",true);
                    if(golem.setVelocityY==0 &&golem.y<this.game.renderer.height/2){
                        golem.setVelocityY(100);
                    }
                    if()

                    else if(golem.setVelocityY>0){
                        golem.setVelocityY(100);
                    }
                }
            },
            callbackScope:this,
            loop: true,
            paused:false
        });
        // golemEvent=this.time.addEvent({
        //     delay: 100,
        //     callback: function (){
        //         golem=this.physics.add.sprite(this.game.renderer.width / 2,this.game.renderer.height / 2-100,"golem")
        //             .setScale(0.4)
        //             .setSize(500,500)
        //             .setOffset(300,300);
        //         golem.anims.play("golemAni",true);
        //         golem.depth=golem.y;
        //     },
        //     callbackScope:this,
        //     loop:false,
        //     paused:false,
        // });
        
    }

    update(delta, time) {
        ermine.depth = ermine.y - (ermine.height - 254);
    }
}

export default BossFight;
