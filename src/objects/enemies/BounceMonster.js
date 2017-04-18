import Enemy from './Enemy.js';

export default class BounceMonster extends Enemy {
    constructor(game, x, y) {
        super(game, x, y, 'bounce_monster');

        this.height = 128;
        this.width = 128;
        this.body.gravity.y = 10000;

        this.body.setSize(this.body.width - 20, this.body.height - 20, 10, 10);
        this.body.collideWorldBounds = true;


        // NOTE - sprite is 64 by 64
        this.animations.add('bouncing', [0, 1, 2, 3, 4], 10, true);

        // this.animations.play('flapping');

        this.touchDamage = 5;
        // this.speedX = 75;
        // this.direction = -1;
        this.moveSpeed = 75;
        // this.body.velocity.x = this.direction * this.moveSpeed;
        this.scale.x *= -1;
    };

    static loadBounceMonsterImage(game) {
        game.load.spritesheet('bounce_monster', 'assets/Enemies/monster_bounce.png', 50, 50); // 480 x 159
    }

    updateEnemy() {
        super.updateEnemy();

        this.animations.play('bouncing');
    };


}
