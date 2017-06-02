require ('../home.scss');

console.log('hello');

var game = new Phaser.Game(640, 360, Phaser.AUTO);

const gameState = {
  preload: () => {
    console.log("preload");
  },

  create: () => {
    console.log("create");
  },

  update: () => {
    // console.log("update");
  }
};

game.state.add('gameState', gameState);
game.state.start('gameState');