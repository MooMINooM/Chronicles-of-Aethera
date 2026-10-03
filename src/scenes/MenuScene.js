import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, height / 2 - 80, 'CHRONICLES OF AETHERA', {
      fontFamily: 'Arial',
      fontSize: '42px',
      color: '#f4e6c1',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 25, 'v0.1 — Greybrook Prototype', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#a8c7b5'
    }).setOrigin(0.5);

    const start = this.add.text(width / 2, height / 2 + 70, 'ENTER GREYBROOK', {
      fontFamily: 'Arial',
      fontSize: '26px',
      color: '#ffffff',
      backgroundColor: '#355c4d',
      padding: { x: 20, y: 12 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    const begin = () => this.scene.start('GreybrookScene');
    start.on('pointerdown', begin);
    this.input.keyboard.once('keydown-ENTER', begin);
  }
}
