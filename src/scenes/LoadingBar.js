import Phaser from "phaser";

var logo=[];
var progressBar;
var progressBox;
let loadingCount;
class LoadingBar extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'LoadingBar'
        });
    }

    preload() {
        progressBar=this.add.graphics();
        progressBox=this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect((this.cameras.main.width / 2)-170, 270, 320, 50);
        //240,270
        // this.load.image('game','src/image/pause.png');
        for (let i=0;i<500;i++){
            this.load.image('loader'+i,'src/image/pause.png');
        }

        this.load.on('progress',(percent)=>{
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect((this.cameras.main.width / 2)-160, 280, 300 * percent, 30);
            //250,280
        });


        this.load.on('complete', ()=>{
            // console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
            this.scene.start('GameScene');
        });
    }
}

export default LoadingBar;