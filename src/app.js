require ('../home.scss');

console.log('hello');

const game = new Phaser.Game(800, 500, Phaser.AUTO);

var spacefield, spaceship, bullets;
var fireButton;
var cursors;
var bgSpeed;
var bulletTime = 0;

const gameState = {
  preload: () => {
    game.load.image('spacefield', 'assets/img/spacefield.jpg');
    game.load.image('spaceship', 'assets/img/spaceship.png');
    game.load.image('bullet', 'assets/img/bullet.png');
  },

  create: () => {
    spacefield = game.add.tileSprite(0, 0, 800, 500, 'spacefield');

    spaceship = game.add.sprite(game.world.centerX, 430, 'spaceship');
    spaceship.scale.setTo(0.2);
    spaceship.anchor.setTo(0.5, 0);
    game.physics.enable(spaceship, Phaser.Physics.ARCADE);

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    bgSpeed = 3;
  },

  update: () => {
    spacefield.tilePosition.y += bgSpeed;
    spaceship.body.velocity.x = 0;

    if (cursors.left.isDown
      && spaceship.body.position.x > 5) {
    console.log(spaceship.body);
      spaceship.body.velocity.x = -350;
    }
    if (cursors.right.isDown
      && spaceship.body.position.x < 760) {
    console.log(spaceship.body);
      spaceship.body.velocity.x = 350;
    }

    if(fireButton.isDown) {
      fireBullet();
    }
  }

};

const fireBullet = () => {
  let bullet;
  if (game.time.now > bulletTime) {
    console.log(bullets);
    bullet = bullets.getFirstExists(false);
    if (bullet) {
      console.log(bullet);
      bullet.anchor.setTo(0.5);
      bullet.scale.setTo(0.02);
      bullet.reset(spaceship.x, spaceship.y);
      bullet.body.velocity.y -= 500;
      bulletTime = game.time.now + 100;
    }
  }
}

game.state.add('gameState', gameState);
game.state.start('gameState');