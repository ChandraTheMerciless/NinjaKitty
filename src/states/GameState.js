import Background from '../objects/environment/Background';
import {
    Platform,
    PlatformTypes,
    PlatformSubTypes
} from '../objects/environment/Platform';
import {
    Tree,
    TreeTypes
} from '../objects/environment/Tree';
import Cloud from '../objects/environment/Cloud';
import Catnip from '../objects/items/Catnip';
import Star from '../objects/items/Star';
import Player from '../objects/player/Player';
import TongueMonster from '../objects/enemies/TongueMonster';
import BounceMonster from '../objects/enemies/BounceMonster';
import Skeleton from '../objects/enemies/Skeleton';
import PhysicsService from './PhysicsService';
import {
    ClickableButton
} from '../menus/buttons/ClickableButton';

export default class GameState extends Phaser.State {
    constructor() {
        super();
        this.monstahMap = {
          1: BounceMonster,
          2: TongueMonster,
          3: Skeleton
        };
    }

    preload() {
        this.game.world.resize(6016, this.game.world.height);

        this.enemies = [];
    }

    create() {
        this.createEnvironment();
        this.createItems();

        this.player = new Player(this.game, 200, 300);
        // this.enemies.push(new TongueMonster(this.game, 2000, 540));
        // this.enemies.push(new BounceMonster(this.game, 900, 520));
        // this.enemies.push(new Skeleton(this.game, 500, 520));
        this.createEnemies();
        this.game.add.existing(this.player);
        this.game.camera.follow(this.player);

        this.finishedLevel = false;
        this.victoryFrames = 0;
        this.gameover = false;
        this.gameover_buttons = this.game.add.group();
    }

    createEnvironment() {
        this.background = new Background(this.game);

        this.group_clouds = this.game.add.group();
        for (let idx = 0; idx < 50; idx++) {
            let jitter = this.getRandomIntFromInterval(10, 120, false),
                x = 200 * idx,
                y = 100 + jitter,
                cloudIndex = this.getRandomIntFromInterval(1, 9);
            new Cloud(this.game, x, y, cloudIndex - 1, this.group_clouds);
        }

        this.group_trees = this.game.add.group();
        for (let idx = 0; idx < 50; idx++) {
            let x = 200 * idx,
                y = 350,
                jitter = this.getRandomIntFromInterval(25, 75);
            new Tree(this.game, -200 + x + jitter, y, jitter % 2 == 0 ? TreeTypes.FULL_PINE : TreeTypes.TOP_HALF_PINE, this.group_trees);
        }

        this.group_platforms = this.game.add.group();
        this.group_platforms.enableBody = true;
        for (let idx = 0; idx < 150; idx++) {
            let x = 53 * idx,
                y = 576;
            new Platform(this.game, -75 + x, y, PlatformTypes.GRASS, PlatformSubTypes.NORMAL, this.group_platforms);
        }
    }

    createEnemies(){
      for (let idx = 0; idx < 10; idx++) {
          let x = 550 * (idx + 1),
              y = 350,
              jitter = this.getRandomIntFromInterval(25, 75);

          const monstahCode = this.getRandomIntFromInterval(1, 3);

          const monstah = new this.monstahMap[monstahCode](this.game, x + jitter, 520);
          this.enemies.push(monstah);
      }
    }

    createItems() {
        this.items = [];
        for (let idx = 0; idx < 20; idx++) {
            let x = 600 * idx + this.getRandomIntFromInterval(100, 400, false);
            this.items.push(new Catnip(this.game, x, 520));
        }
        let star = new Star(this.game, 5750, 300);
        this.items.push(star);
        this.game.add.tween(star).to({y: '+50'}, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
    }

    update() {
        const self = this;

        const attackKeys = [
            {
              keyAdd: self.game.input.keyboard.addKey(Phaser.Keyboard.A),
              keyCode: "lowKick"
            },
            {
              keyAdd: self.game.input.keyboard.addKey(Phaser.Keyboard.S),
              keyCode: "middleKick"
            },
            {
              keyAdd: self.game.input.keyboard.addKey(Phaser.Keyboard.D),
              keyCode: "highKick"
            },
            {
              keyAdd: self.game.input.keyboard.addKey(Phaser.Keyboard.W),
              keyCode: "upperCut"
            },
            {
              keyAdd: self.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
              keyCode: "kamehameha"
            }
        ];

        if (this.player.finishedLevel) {
            this.finishLevel();
        }

        let deltaTime = this.getDeltaTime();

        let hitPlatforms = PhysicsService.collideGroups(this.game, this.player, this.group_platforms);
        let enemiesHitPlatforms = [];
        for (let i = 0; i < this.enemies.length; i++) {
            enemiesHitPlatforms += PhysicsService.collideGroups(this.game, this.enemies[i], this.group_platforms);
        };

        if (!this.finishedLevel) {
            let hitItems = PhysicsService.overlapSpriteArrayAndSprite(this.game, this.items, this.player);
            for (let item of hitItems) {
                item.touchItem(this.player, this.game);
            }

            this.getEnemies();
            this.makeEnemiesChasePlayer();
            this.handleEnemiesHitPlayer();

            if (this.player.health > 0) {
                let cursors = this.game.input.keyboard.createCursorKeys();
                this.player.updatePlayer(cursors, attackKeys, {}, deltaTime);
            } else if (!this.gameover) {
                this.gameover = true;
                this.gameOver();
            }
        }
    };

    getDeltaTime() {
        let elapsedTime = this.game.time.totalElapsedSeconds();
        let deltaTime = elapsedTime - this.previousTime;
        this.previousTime = elapsedTime;
        return deltaTime;
    };

    getEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].updateEnemy();
        };
    };

    makeEnemiesChasePlayer() {
        for (let i = 0; i < this.enemies.length; i++) {
            const distance = this.physics.arcade.distanceBetween(this.enemies[i], this.player);
            if (distance < 200 && !this.enemies[i].didDamage && !this.enemies[i].isHurt) {
                this.physics.arcade.moveToObject(this.enemies[i], this.player, 100);
            }
        };
    };

    getRandomIntFromInterval(min, max, positiveOnly = true) {
        if (positiveOnly) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        } else {
            let random = Math.floor(Math.random() * (max - min + 1) + min);
            return random % 2 == 0 ? random : 0 - random;
        }
    }

    handleEnemiesHitPlayer() {
        let hitEnemies = PhysicsService.overlapSpriteArrayAndSprite(this.game, this.enemies, this.player, null, this.player.canBeHurt, this.player);
        if (hitEnemies[0] && hitEnemies[0].health > 0) {
            if (this.player.attacking) {
                hitEnemies[0].hurtEnemy(this.player);
            } else {
                this.player.touchHurtPlayer(hitEnemies[0]);
            }
        } else {
            for (let enemy of this.enemies) {
                if (enemy.emitterComponent && enemy.emitterComponent.particlesDoDamage &&
                    PhysicsService.overlapGroups(this.game, enemy.emitterComponent, this.player, null, this.player.canBeHurt, this.player)) {
                    this.player.hazardHurtPlayer(enemy.emitterComponent.particleDamage);
                    break;
                }
            }
        }
    };

    finishLevel() {
        if (!this.finishedLevel) {
            this.finishedLevel = true;
            for (let i = 0; i < this.enemies.length; i++) {
                this.enemies[i].playDead();
            };
        }
        if (this.victoryFrames < 180) {
            this.victoryFrames++;
        } else {
            this.restartLevel();
        }
    }

    gameOver() {
        this.player.playDead();
        this.gameover_buttons.add(new ClickableButton(this.game, 300, 250, 'Try Again', this.restartLevel, this));
        this.gameover_buttons.add(new ClickableButton(this.game, 300, 350, 'Main Menu', this.backToMenu, this));
        let text = this.gameover_buttons.add(new Phaser.Text(this.game, 0, 0, 'Game Over', {
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontSize: '60px',
            font: 'Arial',
            strokeThickness: 8,
            fill: '#ff5656',
            stroke: '#d30a0a'
        }));
        text.setTextBounds(0, 50, 800, 100);
        this.gameover_buttons.fixedToCamera = true;
    }

    restartLevel() {
        this.game.state.restart();
    }

    backToMenu() {
        this.game.state.start('main');
    }

    shutdown() {
        this.game.world.removeAll();
        this.gameover_buttons.removeAll(true);
    }
}
