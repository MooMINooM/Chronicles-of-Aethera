const Phaser = window.Phaser;

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.spritesheet('terrain_atlas_16', '/assets/spr_tileset_sunnysideworld_16px.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet('forest_atlas_32', '/assets/spr_tileset_sunnysideworld_forest_32px.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet('prop_tree_01', '/assets/spr_deco_tree_01_strip4.png', {
      frameWidth: 32,
      frameHeight: 34
    });
    this.load.spritesheet('prop_tree_02', '/assets/spr_deco_tree_02_strip4.png', {
      frameWidth: 28,
      frameHeight: 43
    });
    this.load.spritesheet('prop_windmill', '/assets/spr_deco_windmill_withshadow_strip9.png', {
      frameWidth: 112,
      frameHeight: 112
    });

    this.load.spritesheet('player_base_walk', '/assets/base_walk_strip8.png', {
      frameWidth: 96,
      frameHeight: 64
    });
    this.load.spritesheet('player_hair_short_walk', '/assets/shorthair_walk_strip8.png', {
      frameWidth: 96,
      frameHeight: 64
    });
    this.load.spritesheet('npc_goblin_walk', '/assets/spr_walk_strip8.png', {
      frameWidth: 96,
      frameHeight: 64
    });
  }

  create() {
    this.scene.start('MenuScene');
  }
}
