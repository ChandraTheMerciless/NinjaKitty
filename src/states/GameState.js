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
      this.player = new Player(this.game, 10, 10);
      this.game.add.existing(this.player);
      this.game.camera.follow(this.player);
    }





    update() {
      let deltaTime = this.getDeltaTime();
      let cursors = this.game.input.keyboard.createCursorKeys();
      this.player.updatePlayer(cursors, {}, deltaTime);
    };

    getDeltaTime() {
        let elapsedTime = this.game.time.totalElapsedSeconds();
        let deltaTime = elapsedTime - this.previousTime;
        this.previousTime = elapsedTime;
        return deltaTime;
    }
  }
