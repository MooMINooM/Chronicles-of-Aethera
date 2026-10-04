const Phaser = window.Phaser;

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player_base_walk', 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);
    this.body.setSize(28, 30);
    this.body.setOffset(34, 30);
    this.setDepth(20);
    this.speed = 260;

    this.keys = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });

    this.cursors = scene.input.keyboard.createCursorKeys();
    if (!scene.anims.exists('player-walk')) {
      scene.anims.create({
        key: 'player-walk',
        frames: scene.anims.generateFrameNumbers('player_base_walk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
      });
    }
  }

  update() {
    const velocity = new Phaser.Math.Vector2(0, 0);

    if (this.keys.left.isDown || this.cursors.left.isDown) velocity.x -= 1;
    if (this.keys.right.isDown || this.cursors.right.isDown) velocity.x += 1;
    if (this.keys.up.isDown || this.cursors.up.isDown) velocity.y -= 1;
    if (this.keys.down.isDown || this.cursors.down.isDown) velocity.y += 1;

    velocity.normalize().scale(this.speed);
    this.body.setVelocity(velocity.x, velocity.y);

    if (velocity.lengthSq() > 0) {
      this.anims.play('player-walk', true);
    } else {
      this.anims.stop();
      this.setFrame(0);
    }
  }
}
