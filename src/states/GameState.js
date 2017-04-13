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
import Player from '../objects/player/Player';
import TongueMonster from '../objects/enemies/TongueMonster';
import BounceMonster from '../objects/enemies/BounceMonster';
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
        this.createEnvironment();
        this.createItems();

        this.player = new Player(this.game, 200, 300);
        this.enemies.push(new TongueMonster(this.game, 500, 540));
        this.enemies.push(new BounceMonster(this.game, 700, 540));
        this.game.add.existing(this.player);
        this.game.camera.follow(this.player);
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

    createItems() {
        this.items = [];
        this.items.push(new Catnip(this.game, 50, 520));
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
        // let touchEnemies = PhysicsService.collideGroups(this.game, this.player, this.enemies);
        let hitItems = PhysicsService.overlapSpriteArrayAndSprite(this.game, this.items, this.player);
        for (let item of hitItems) {
            item.touchItem(this.player, this.game);
        }

        // let enemiesHitPlatforms = [];
        //
        // for (let i = 0; i < this.enemies.length; i++) {
        //     enemiesHitPlatforms += PhysicsService.collideGroups(this.game, this.enemies[i], this.group_platforms);;
        // };

        this.getEnemies();
        this.makeEnemiesChasePlayer();
        this.handleEnemiesHitPlayer();

        let cursors = this.game.input.keyboard.createCursorKeys();
        this.player.updatePlayer(cursors, attackKeys, {}, deltaTime);

        //for debugging hitboxes (puts a green box behind the sprite showing the hitbox)
        this.game.debug.body(this.player);
        this.game.debug.body(this.enemies[0]);
        this.game.debug.body(this.enemies[1]);
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
            if (distance < 200) {
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
        // let hitEnemies = PhysicsService.collideGroups(this.game, this.enemies, this.player, null, this.player.canBeHurt, this.player);
        let hitEnemies = PhysicsService.overlapSpriteArrayAndSprite(this.game, this.enemies, this.player, null, this.player.canBeHurt, this.player);
        console.log(hitEnemies);
        if (hitEnemies[0]) {
          // debugger;
            this.player.touchHurtPlayer(hitEnemies[0]);
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
}
