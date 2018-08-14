var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 576,
    physics: {
         default: 'arcade',
         arcade: {
             gravity: { y: 300 },
             debug: false
         }
     },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('sky', 'assets/backgrounds/backgrounds_sky.png');

  this.load.image("cutscene1_tileset", "assets/tilesets/tilesets_level.png");
  this.load.tilemapTiledJSON("cutscene1", "assets/levels/level_cutscene1.json");
  this.load.image('cloud1_1', 'assets/sprites/clouds_1_1.png');
  this.load.image('cloud1_2', 'assets/sprites/clouds_1_2.png');

  this.load.spritesheet('adventurer',
      'assets/sprites/adventurer/adventurer-v1.5-Sheet.png',
      { frameWidth: 50, frameHeight: 37 }
  );
}

function create ()
{

  background = this.add.sprite(400,300,"sky");
  background.setScale(4.5);

  cloud1 = this.add.sprite(1800,500,"cloud1_1");
  cloud2 = this.add.sprite(1500,350,"cloud1_2");
  cloud3 = this.add.sprite(800,400,"cloud1_1");
  map = this.make.tilemap({ key: "cutscene1" });
  tileset = map.addTilesetImage("cutscene1", "cutscene1_tileset");
  worldLayer = map.createStaticLayer("cutscene1", tileset, 0, 0);
  worldLayer_nocollision = map.createStaticLayer("cutscene1_nocollide", tileset, 0, 0);
  worldLayer.setCollisionByExclusion([11,13,126,127,128,1]);

  adventurer = this.physics.add.sprite(2300, 710, 'adventurer');
  adventurer.setScale(1.2);
  this.physics.add.collider(worldLayer, adventurer);

  this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('adventurer', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers('adventurer', { start: 9, end: 13 }),
      frameRate: 10,
      repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();
    
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  this.cameras.main.startFollow(adventurer);

}

function update ()
{
  // Movimento
  if (cursors.left.isDown)
  {
      adventurer.setVelocityX(-160);
      adventurer.flipX = true;
      adventurer.anims.play('move', true);
  }
  else if (cursors.right.isDown)
  {
      adventurer.setVelocityX(160);
      adventurer.flipX = false;
      adventurer.anims.play('move', true);
  }
  else {
    adventurer.setVelocityX(0);
    adventurer.flipX = true;
    adventurer.anims.play('idle', true);
  }

  // Salto
  if (cursors.up.isDown && adventurer.body.onFloor())
  {
      adventurer.setVelocityY(-250);
  }

}
