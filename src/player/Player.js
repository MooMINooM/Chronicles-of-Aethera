const Phaser = window.Phaser;

export default class Player extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 34, 42, 0x5ca9e6);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);
    this.body.setSize(28, 34);
    this.speed = 260;

    this.keys = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    const velocity = new Phaser.Math.Vector2(0, 0);

    if (this.keys.left.isDown || this.cursors.left.isDown) velocity.x -= 1;
    if (this.keys.right.isDown || this.cursors.right.isDown) velocity.x += 1;
    if (this.keys.up.isDown || this.cursors.up.isDown) velocity.y -= 1;
    if (this.keys.down.isDown || this.cursors.down.isDown) velocity.y += 1;

    velocity.normalize().scale(this.speed);
    this.body.setVelocity(velocity.x, velocity.y);
  }
}
