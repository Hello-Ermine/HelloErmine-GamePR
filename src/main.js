import 'phaser';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import GameOver from './scenes/GameOver';
import LoadingBar from './scenes/LoadingBar';
import Default from './scenes/Defualt';
import MainMenu from './scenes/MainMenu';
import BossFight from './scenes/BossFight';


const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            // gravity: {y:300}
        }
    },
    scene: [
        LoadingBar,
        MainMenu,
        GameScene,
        GameOver,
        // BossFight
        // Default
    ],

};

const game = new Phaser.Game(config);