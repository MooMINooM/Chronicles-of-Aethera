const Phaser = window.Phaser;
import Player from '../player/Player.js';
import { GREYBROOK } from '../data/greybrookLayout.js';

const COLORS = {
  grass: 0x799965,
  grassDark: 0x658254,
  roadMain: 0xb49a72,
  roadSide: 0xa98e67,
  water: 0x5c91b8,
  wall: 0x66635c,
  building: 0x8d6248,
  buildingOutline: 0x4a3326,
  civic: 0x766b8c,
  shop: 0x9c704a,
  house: 0x8b735f,
  craft: 0x7b6653,
  farm: 0x9d9855,
  landmark: 0xb8b0a0
};

export default class GreybrookScene extends Phaser.Scene {
  constructor() {
    super('GreybrookScene');
  }

  create() {
    const { width, height } = GREYBROOK.world;

    this.physics.world.setBounds(0, 0, width, height);
    this.cameras.main.setBounds(0, 0, width, height);

    this.blockers = [];

    this.createTerrain();
    this.createRoads();
    this.createWater();
    this.createFarmsAndGroves();
    this.createTownWalls();
    this.createBuildings();
    this.createLandmarks();
    this.createNPCs();
    this.createDistrictLabels();

    this.player = new Player(this, GREYBROOK.spawn.x, GREYBROOK.spawn.y);
    this.physics.add.collider(this.player, this.blockers);

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1);

    this.createHUD();
    this.createMiniMap();
  }

  createTerrain() {
    const { width, height } = GREYBROOK.world;
    // Frame 65 is a plain grass tile from the imported 16 px atlas. TileSprite
    // repeats the complete source image rather than a cropped atlas frame, so
    // lay down the selected frame explicitly to preserve the intended tile.
    for (let x = 0; x < width; x += 64) {
      for (let y = 0; y < height; y += 64) {
        this.add.image(x, y, 'terrain_atlas_16', 65)
          .setOrigin(0)
          .setScale(4)
          .setDepth(-20);
      }
    }
  }

  createRoads() {
    GREYBROOK.roads.forEach((road) => {
      const color = road.kind === 'main' ? COLORS.roadMain : COLORS.roadSide;
      this.add.rectangle(road.x, road.y, road.w, road.h, color);
    });
  }

  createWater() {
    GREYBROOK.water.forEach((area) => {
      this.add.rectangle(area.x, area.y, area.w, area.h, COLORS.water)
        .setStrokeStyle(4, 0x3f7194);

      this.add.text(area.x, area.y, area.label, {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#d9f1ff',
        backgroundColor: '#315b7888',
        padding: { x: 8, y: 5 }
      }).setOrigin(0.5).setAngle(area.h > area.w ? 90 : 0);

      this.addStaticBlocker(area.x, area.y, area.w, area.h, false);
    });
  }

  createFarmsAndGroves() {
    GREYBROOK.farms.forEach((farm) => {
      this.add.rectangle(farm.x, farm.y, farm.w, farm.h, COLORS.farm)
        .setStrokeStyle(3, 0x6f6a39);

      const rows = this.add.graphics();
      rows.lineStyle(2, 0x6f6a39, 0.6);
      for (let y = farm.y - farm.h / 2 + 30; y < farm.y + farm.h / 2; y += 45) {
        rows.lineBetween(farm.x - farm.w / 2 + 20, y, farm.x + farm.w / 2 - 20, y);
      }

      const cropKey = farm.label === 'WEST FIELDS' ? 'crop_wheat_mature' : 'crop_cabbage_mature';
      for (let x = farm.x - farm.w / 2 + 48; x < farm.x + farm.w / 2 - 20; x += 58) {
        for (let y = farm.y - farm.h / 2 + 35; y < farm.y + farm.h / 2 - 15; y += 46) {
          this.add.image(x, y, cropKey).setOrigin(0.5, 1).setScale(3).setDepth(y);
        }
      }

      this.add.sprite(farm.x + farm.w / 2 - 55, farm.y, 'animal_chicken', 0)
        .setOrigin(0.5, 1)
        .setScale(2)
        .setDepth(farm.y + 1);

      this.add.text(farm.x, farm.y, farm.label, {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#393820',
        backgroundColor: '#eee7bd99',
        padding: { x: 6, y: 4 }
      }).setOrigin(0.5);
    });

    GREYBROOK.groves.forEach((grove) => {
      this.add.rectangle(grove.x, grove.y, grove.w, grove.h, COLORS.grassDark)
        .setStrokeStyle(3, 0x415d3c);

      const trees = [];
      for (let x = grove.x - grove.w / 2 + 35; x < grove.x + grove.w / 2; x += 70) {
        for (let y = grove.y - grove.h / 2 + 35; y < grove.y + grove.h / 2; y += 70) {
          const tree = this.add.sprite(x, y, 'prop_tree_01', (x + y) % 4)
            .setOrigin(0.5, 0.8)
            .setScale(2)
            .setDepth(y);
          trees.push(tree);
        }
      }

      this.add.text(grove.x, grove.y, grove.label, {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#e6f3df',
        backgroundColor: '#2c493899',
        padding: { x: 6, y: 4 }
      }).setOrigin(0.5);
    });
  }

  createTownWalls() {
    GREYBROOK.walls.forEach((wall) => {
      this.add.rectangle(wall.x, wall.y, wall.w, wall.h, COLORS.wall)
        .setStrokeStyle(4, 0x3f3d39);
      this.addStaticBlocker(wall.x, wall.y, wall.w, wall.h);
    });
  }

  createBuildings() {
    GREYBROOK.buildings.forEach((b) => {
      const fill = this.getBuildingColor(b.type);
      const buildingArt = this.getBuildingArt(b.type);
      const rect = this.add.rectangle(b.x, b.y, b.w, b.h, fill)
        .setStrokeStyle(4, COLORS.buildingOutline)
        .setVisible(!buildingArt);

      rect.setData('layoutId', b.id);
      rect.setData('assetKey', b.assetKey);
      rect.setData('buildingType', b.type);

      this.addStaticBlocker(b.x, b.y, b.w, b.h);

      if (buildingArt) {
        this.add.image(b.x, b.y + b.h / 2, buildingArt.key)
          .setOrigin(0.5, 1)
          .setScale(buildingArt.scale)
          .setDepth(b.y + 1);
      }

      if (b.id === 'mill') {
        this.add.sprite(b.x, b.y + 20, 'prop_windmill', 0)
          .setOrigin(0.5, 0.82)
          .setScale(2.15)
          .setDepth(b.y + 1);
      }

      this.add.text(b.x, b.y - 8, b.name.toUpperCase(), {
        fontFamily: 'Arial',
        fontSize: b.w < 300 ? '13px' : '15px',
        color: '#fff6df',
        align: 'center',
        wordWrap: { width: Math.max(180, b.w - 25) }
      }).setOrigin(0.5).setDepth(b.y + 2);

      this.add.text(b.x, b.y + 28, `[${b.assetKey}]`, {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#e6d4c1'
      }).setOrigin(0.5).setDepth(b.y + 2);
    });
  }

  createLandmarks() {
    GREYBROOK.landmarks.forEach((l) => {
      if (l.type === 'tree') {
        const obj = this.add.sprite(l.x, l.y, 'prop_tree_01', 0)
          .setOrigin(0.5, 0.82)
          .setScale(5)
          .setDepth(l.y);
        obj.setData('assetKey', l.assetKey);
        this.addStaticBlocker(l.x, l.y + 25, l.radius * 1.4, l.radius);
      } else if (l.radius) {
        const obj = this.add.circle(l.x, l.y, l.radius, l.type === 'tree' ? 0x47704a : COLORS.landmark)
          .setStrokeStyle(4, 0x5c554b);
        obj.setData('assetKey', l.assetKey);
        this.addStaticBlocker(l.x, l.y, l.radius * 2, l.radius * 2);
      } else {
        const obj = this.add.rectangle(l.x, l.y, l.w, l.h, COLORS.landmark)
          .setStrokeStyle(3, 0x5c554b);
        obj.setData('assetKey', l.assetKey);
        this.addStaticBlocker(l.x, l.y, l.w, l.h);
      }

      this.add.text(l.x, l.y - (l.radius || l.h || 40) / 2 - 20, l.name, {
        fontFamily: 'Arial',
        fontSize: '13px',
        color: '#2d2923',
        backgroundColor: '#fff6dfbb',
        padding: { x: 4, y: 2 }
      }).setOrigin(0.5).setDepth(l.y + 1);
    });
  }

  createNPCs() {
    GREYBROOK.npcs.forEach((npc) => {
      const marker = this.add.circle(npc.x, npc.y, 18, 0xe5a35a)
        .setStrokeStyle(3, 0x74451f);
      marker.setData('npcId', npc.id);

      this.add.text(npc.x, npc.y - 38, `${npc.name} — ${npc.role}`, {
        fontFamily: 'Arial',
        fontSize: '12px',
        color: '#1f1b17',
        backgroundColor: '#fff7e5cc',
        padding: { x: 4, y: 2 }
      }).setOrigin(0.5);
    });
  }

  createDistrictLabels() {
    GREYBROOK.districts.forEach((d) => {
      this.add.text(d.x, d.y, d.name, {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#2f2b27',
        backgroundColor: '#f4ead2aa',
        padding: { x: 8, y: 5 }
      }).setOrigin(0.5).setDepth(5);
    });
  }

  createHUD() {
    this.add.text(18, 18, 'GREYBROOK — FULL PLACEHOLDER LAYOUT\nWASD / Arrow Keys to move', {
      fontFamily: 'Arial',
      fontSize: '17px',
      color: '#ffffff',
      backgroundColor: '#000000aa',
      padding: { x: 10, y: 8 }
    }).setScrollFactor(0).setDepth(200);

    this.add.text(18, 82, 'All rectangles are replaceable by final assets later.', {
      fontFamily: 'Arial',
      fontSize: '13px',
      color: '#d8e4d1',
      backgroundColor: '#00000088',
      padding: { x: 8, y: 5 }
    }).setScrollFactor(0).setDepth(200);
  }

  createMiniMap() {
    const mapX = 1070;
    const mapY = 95;
    const mapW = 180;
    const mapH = 128;
    const scaleX = mapW / GREYBROOK.world.width;
    const scaleY = mapH / GREYBROOK.world.height;

    this.add.rectangle(mapX, mapY, mapW + 16, mapH + 30, 0x111111, 0.78)
      .setScrollFactor(0).setDepth(200)
      .setStrokeStyle(2, 0xffffff, 0.35);

    this.add.text(mapX, mapY - mapH / 2 - 9, 'GREYBROOK MAP', {
      fontFamily: 'Arial',
      fontSize: '11px',
      color: '#ffffff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(201);

    const g = this.add.graphics().setScrollFactor(0).setDepth(201);
    g.fillStyle(0x799965, 1);
    g.fillRect(mapX - mapW / 2, mapY - mapH / 2, mapW, mapH);

    g.fillStyle(0xb49a72, 1);
    GREYBROOK.roads.forEach((r) => {
      g.fillRect(
        mapX - mapW / 2 + (r.x - r.w / 2) * scaleX,
        mapY - mapH / 2 + (r.y - r.h / 2) * scaleY,
        r.w * scaleX,
        r.h * scaleY
      );
    });

    g.fillStyle(0x8d6248, 1);
    GREYBROOK.buildings.forEach((b) => {
      g.fillRect(
        mapX - mapW / 2 + (b.x - b.w / 2) * scaleX,
        mapY - mapH / 2 + (b.y - b.h / 2) * scaleY,
        Math.max(2, b.w * scaleX),
        Math.max(2, b.h * scaleY)
      );
    });

    this.miniPlayer = this.add.circle(mapX, mapY, 3.5, 0xffffff)
      .setScrollFactor(0)
      .setDepth(203);

    this.miniMapMeta = { mapX, mapY, mapW, mapH, scaleX, scaleY };
  }

  addStaticBlocker(x, y, w, h) {
    const blocker = this.add.rectangle(x, y, w, h, 0x000000, 0);
    this.physics.add.existing(blocker, true);
    blocker.setVisible(false);
    this.blockers.push(blocker);
    return blocker;
  }

  getBuildingColor(type) {
    if (['town-hall', 'civic', 'school', 'library', 'clinic', 'temple', 'guild'].includes(type)) return COLORS.civic;
    if (['shop', 'market', 'inn'].includes(type)) return COLORS.shop;
    if (['house'].includes(type)) return COLORS.house;
    if (['craft', 'warehouse', 'utility', 'mill'].includes(type)) return COLORS.craft;
    if (['farm'].includes(type)) return COLORS.farm;
    return COLORS.building;
  }

  getBuildingArt(type) {
    if (type === 'tower') return { key: 'building_tower_blue', scale: 2 };
    if (['gate'].includes(type)) return null;
    if (['house', 'farm', 'craft', 'warehouse', 'utility', 'mill'].includes(type)) {
      return { key: 'building_house_small_blue', scale: 3 };
    }
    return { key: 'building_house_large_blue', scale: 4 };
  }

  update() {
    this.player?.update();

    if (this.miniPlayer && this.miniMapMeta && this.player) {
      const { mapX, mapY, mapW, mapH, scaleX, scaleY } = this.miniMapMeta;
      this.miniPlayer.setPosition(
        mapX - mapW / 2 + this.player.x * scaleX,
        mapY - mapH / 2 + this.player.y * scaleY
      );
    }
  }
}
