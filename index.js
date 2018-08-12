var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 576,
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
}

function create ()
{

  var background = this.add.sprite(400,300,"sky");
  background.setScale(2.5);

  var cloud1 = this.add.sprite(500,150,"cloud1_1");

  const map = this.make.tilemap({ key: "cutscene1" });
  const tileset = map.addTilesetImage("cutscene1", "cutscene1_tileset");
  const worldLayer = map.createStaticLayer("cutscene1", tileset, 0, 0);
  worldLayer.setCollisionByProperty({ collides: true });
}

function update ()
{
}
