import Phaser from "phaser";

let golem;
let golemEvent;


class Defualt extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'Defualt'
        });
    }

    preload() {
        this.load.spritesheet('golemTest', 'src/image/Character/golem/Golem2_sprite.png', {
            frameWidth: 1000, frameHeight: 1000
        });
    }

    create() {
        // golem=this.physics.add.sprite(this.game.renderer.width / 2,this.game.renderer.height / 2,"golem")
        //     .setScale(0.6)
        //     .setSize(500,500);
        let golemAni=this.anims.create({
            key:"golemAni",
            frames: this.anims.generateFrameNumbers("golemTest",{
                start:0,
                end:3,
            }),
            duration:750,
            framerate:1,
            repeat:-1,
        });
        // golem.anims.play("golemAni",true);


        golemEvent=this.time.addEvent({
            delay: 1000,
            callback: function (){
                golem=this.physics.add.sprite(this.game.renderer.width / 2,this.game.renderer.height / 2,"golem")
            .setScale(0.6)
            .setSize(500,500);
            golem.anims.play("golemAni",true);
            },
            callbackScope:this,
            loop:false,
            paused:false,
        });
    }

    update(delta, time) {
    }
}

export default Defualt;
