import 'phaser';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import GameOverStory from './scenes/GameOverStory';
import GameOverArcade from './scenes/GameOverArcade';
import LoadingBar from './scenes/LoadingBar';
import Default from './scenes/Defualt';
import MainMenu from './scenes/MainMenu';
import BossFight from './scenes/BossFight';
import TutorialScene from './scenes/TutorialScene';
import TutorialScene02 from './scenes/TutorialScene02';
import CutSceneBossFight from './scenes/CutSceneBossfight';


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
        TutorialScene,
        TutorialScene02,
        GameScene,
        CutSceneBossFight,
        BossFight,
        GameOverStory,
        GameOverArcade,
        Default
    ],

};

const game = new Phaser.Game(config);
