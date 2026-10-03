import Phaser from 'phaser';
import Player from '../player/Player.js';

export default class GreybrookScene extends Phaser.Scene {
  constructor() {
    super('GreybrookScene');
  }

  create() {
    const worldWidth = 2200;
    const worldHeight = 1500;

    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    this.createGround(worldWidth, worldHeight);
    this.createGreybrookPlaceholders();

    this.player = new Player(this, 1100, 900);
    this.physics.add.collider(this.player, this.walls);

    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
    this.cameras.main.setZoom(1.15);

    this.add.text(18, 18, 'Greybrook — Prototype\nWASD to move', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 10, y: 8 }
    }).setScrollFactor(0).setDepth(100);

    this.add.text(1100, 665, 'GREYBROOK TOWN SQUARE', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#493b2f'
    }).setOrigin(0.5);
  }

  createGround(width, height) {
    this.add.rectangle(width / 2, height / 2, width, height, 0x7e9d67);

    const road = 0xb79c72;
    this.add.rectangle(width / 2, height / 2, 250, height, road);
    this.add.rectangle(width / 2, 700, width, 220, road);

    const grid = this.add.graphics();
    grid.lineStyle(1, 0x000000, 0.06);
    for (let x = 0; x <= width; x += 64) grid.lineBetween(x, 0, x, height);
    for (let y = 0; y <= height; y += 64) grid.lineBetween(0, y, width, y);
  }

  createGreybrookPlaceholders() {
    this.walls = this.physics.add.staticGroup();

    const addBuilding = (x, y, w, h, label) => {
      const building = this.add.rectangle(x, y, w, h, 0x8c5d3f)
        .setStrokeStyle(4, 0x4a2f22);
      this.physics.add.existing(building, true);
      this.walls.add(building);

      this.add.text(x, y, label, {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#fff4dd',
        align: 'center'
      }).setOrigin(0.5);
    };

    addBuilding(650, 420, 260, 180, 'BLACKSMITH');
    addBuilding(1550, 420, 270, 180, 'GENERAL STORE');
    addBuilding(690, 1030, 300, 190, 'GREYBROOK INN');
    addBuilding(1510, 1040, 270, 185, 'APOTHECARY');
    addBuilding(350, 700, 230, 170, 'OLD HOUSE');

    const fountain = this.add.circle(1100, 700, 70, 0x5b9bd5)
      .setStrokeStyle(12, 0xb6b0a1);
    this.physics.add.existing(fountain, true);
    this.walls.add(fountain);

    const npcData = [
      { x: 1030, y: 590, name: 'Rowan' },
      { x: 1210, y: 770, name: 'Mira' },
      { x: 1010, y: 840, name: 'Old Garrick' }
    ];

    npcData.forEach(({ x, y, name }) => {
      this.add.circle(x, y, 18, 0xe7a85c);
      this.add.text(x, y - 34, name, {
        fontFamily: 'Arial',
        fontSize: '14px',
        color: '#1b1b1b',
        backgroundColor: '#ffffffbb',
        padding: { x: 4, y: 2 }
      }).setOrigin(0.5);
    });
  }

  update() {
    this.player?.update();
  }
}
