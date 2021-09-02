import 'phaser';
import Phaser from 'phaser';
import GameScene from './scenes/Story/GameScene';
import GameOverStory from './scenes/Story/GameOverStory';
import GameOverArcade from './scenes/Arcade/GameOverArcade';
import LoadingBar from './scenes/MainMenu/LoadingBar';
import Default from './scenes/Defualt';
import MainMenu from './scenes/MainMenu/MainMenu';
import BossFight from './scenes/Story/BossFight';
import TutorialScene from './scenes/MainMenu/TutorialScene';
import TutorialScene02 from './scenes/MainMenu/TutorialScene02';
import CutSceneBossFight from './scenes/Story/CutSceneBossfight';


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
        // Default
    ],

};

const game = new Phaser.Game(config);