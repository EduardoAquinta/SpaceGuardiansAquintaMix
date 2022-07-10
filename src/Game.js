import GameScene from "./Scenes/GameScene.js";
import TitleScene from "./Scenes/TitleScene.js";
import { PauseScene } from "./Scenes/PauseScene.js";
import { CreditsScene } from "./Scenes/CreditsScene.js";


// Phaser configuration
const config = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.FIT,
        parent: "game",
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
      },
      physics: {
        default: "arcade",
        debug: true,
        arcade: {
          gravity: { y: 0.05 },
        },
      },
      audio: {
        disableWebAudio: true,
      },
      scene: [TitleScene, GameScene, CreditsScene, PauseScene],
    }
//initialise the game
let game = new Phaser.Game(config);









      

   


