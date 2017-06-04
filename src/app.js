require ('../home.scss');

var spacefield, spaceship, bullets, enemies;
var fireButton;
var cursors;
var bgSpeed;
var bulletTime = 0;

const game = new Phaser.Game(800, 500, Phaser.AUTO);

const gameState = {
  preload: () => {
    game.load.image('spacefield', 'assets/img/spacefield.jpg');
    game.load.image('spaceship', 'assets/img/spaceship.png');
    game.load.image('bullet', 'assets/img/bullet.png');
    game.load.image('enemy', 'assets/img/enemy.png');
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

    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    createEnemies();

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    bgSpeed = 3;
  },

  update: () => {
    game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);

    spacefield.tilePosition.y += bgSpeed;
    spaceship.body.velocity.x = 0;

    if (cursors.left.isDown && spaceship.body.position.x > 5) {
      spaceship.body.velocity.x = -350;
    }
    if (cursors.right.isDown && spaceship.body.position.x < 760) {
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

const createEnemies = () => {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 6; x++) {
      let enemy = enemies.create(x*40, y*40, 'enemy');
      enemy.scale.setTo(0.2);
      enemy.anchor.setTo(0.5);
    }
  }
  enemies.x = 90;
  enemies.y = 50;

  let tween = game.add.tween(enemies).to({x: 500}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
  tween.onRepeat.add(descend, this);
}

const descend = () => {
  console.log("here");
  enemies.y += 10;
}

const collisionHandler = (bullet, enemy) => {
  bullet.kill();
  enemy.kill();
}

game.state.add('gameState', gameState);
game.state.start('gameState');