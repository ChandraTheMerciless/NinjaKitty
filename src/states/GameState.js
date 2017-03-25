import Background from '../objects/environment/Background';
import { Platform, PlatformTypes, PlatformSubTypes } from '../objects/environment/Platform';
import Player from '../objects/player/Player';

export default class GameState extends Phaser.State {
    constructor() {
        super();
    }

    preload() {

    }

    create() {
      this.background = new Background(this.game);

      this.group_platforms = this.game.add.group();
      this.group_platforms.enableBody = true;
      for (let idx = 0; idx < 100; idx++) {
          let x = 52 * idx, y = 576;
          new Platform(this.game, x, y, PlatformTypes.GRASS, PlatformSubTypes.NORMAL, this.group_platforms);
      }

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
