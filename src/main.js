const Phaser = window.Phaser;

import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import GreybrookScene from './scenes/GreybrookScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#101820',
  width: 1280,
  height: 720,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, MenuScene, GreybrookScene]
};

new Phaser.Game(config);
