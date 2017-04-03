import Background from '../objects/environment/Background';
import { Platform, PlatformTypes, PlatformSubTypes } from '../objects/environment/Platform';
import { Tree, TreeTypes } from '../objects/environment/Tree';
import Player from '../objects/player/Player';
import TongueMonster from '../objects/enemies/TongueMonster';
import PhysicsService from './PhysicsService';

export default class GameState extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
        this.game.world.resize(6016, this.game.world.height);

        this.enemies = [];
    }

    create() {
      this.createBackground();

      this.player = new Player(this.game, 200, 300);
      this.enemies.push(new TongueMonster(this.game, 200, 300));
      this.game.add.existing(this.player);
      this.game.camera.follow(this.player);
    }

    createBackground() {
      this.background = new Background(this.game);

      this.group_trees = this.game.add.group();
      new Tree(this.game, -140, 350, TreeTypes.FULL_PINE, this.group_trees);
      for (let idx = 0; idx < 50; idx++) {
          let x = 200 * idx, y = 350;
          let jitter = this.randomIntFromInterval(25, 75);
          new Tree(this.game, x+jitter, y, jitter%2 == 0 ? TreeTypes.FULL_PINE : TreeTypes.TOP_HALF_PINE, this.group_trees);
      }

      this.group_platforms = this.game.add.group();
      new Platform(this.game, -53, 576, PlatformTypes.GRASS, PlatformSubTypes.NORMAL, this.group_platforms);
      this.group_platforms.enableBody = true;
      for (let idx = 0; idx < 150; idx++) {
          let x = 53 * idx, y = 576;
          new Platform(this.game, x, y, PlatformTypes.GRASS, PlatformSubTypes.NORMAL, this.group_platforms);
      }
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

      let hitPlatforms = PhysicsService.collideGroups(this.game, this.player, this.group_platforms);

      let cursors = this.game.input.keyboard.createCursorKeys();
      this.player.updatePlayer(cursors, attackKeys, {}, deltaTime);
      // this.enemies["TongueMonster"].updateEnemy();

      for(let i = 0; i < this.enemies.length; i++){
        this.enemies[i].updateEnemy();
      };

    };

    getDeltaTime() {
        let elapsedTime = this.game.time.totalElapsedSeconds();
        let deltaTime = elapsedTime - this.previousTime;
        this.previousTime = elapsedTime;
        return deltaTime;
    }

    randomIntFromInterval(min, max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    }
  }
