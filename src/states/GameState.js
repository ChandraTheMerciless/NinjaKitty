import Background from '../objects/environment/Background';
import Player from '../objects/player/Player';

export default class GameState extends Phaser.State {
    constructor() {
        super();
    }

    preload() {

    }

    create() {
      this.background = new Background(this.game);
      this.player = new Player(this.game, 200, 300);
      this.game.add.existing(this.player);
      this.game.camera.follow(this.player);
    }





    update() {
      const self = this;

      const attackKeys = {
          keyA: self.game.input.keyboard.addKey(Phaser.Keyboard.A),
          keyS: self.game.input.keyboard.addKey(Phaser.Keyboard.S),
          keyD: self.game.input.keyboard.addKey(Phaser.Keyboard.D),
          keyW: self.game.input.keyboard.addKey(Phaser.Keyboard.W),
          keySpace: self.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      }


      let deltaTime = this.getDeltaTime();
      let cursors = this.game.input.keyboard.createCursorKeys();
      this.player.updatePlayer(cursors, attackKeys, {}, deltaTime);
    };

    getDeltaTime() {
        let elapsedTime = this.game.time.totalElapsedSeconds();
        let deltaTime = elapsedTime - this.previousTime;
        this.previousTime = elapsedTime;
        return deltaTime;
    }
  }
