import Enemy from './Enemy.js';

export default class TongueMonster extends Enemy {
    constructor(game, x, y) {
        super(game, x, y, 'tongue_monster');

        this.height = 128;
        this.width = 128;

        this.body.setSize(this.body.width - 35, this.body.height - 35, 17, 20);
        this.body.collideWorldBounds = true;


        // NOTE - sprite is 64 by 64
        this.animations.add('flapping', [0, 1, 2, 3, 4], 10, true);
        this.animations.add('attacking', [8, 9, 10, 11, 12], 9, true);
        this.animations.add('death', [16, 17, 18, 19, 20, 21, 22, 23], 10, false);

        // this.animations.play('flapping');

        this.touchDamage = 7;
        // this.speedX = 75;
        // this.direction = -1;
        this.moveSpeed = 75;
        // this.body.velocity.x = this.direction * this.moveSpeed;
        this.scale.x *= -1;

        this.health = 15;
    };

    static loadTongueMonsterImage(game) {
        game.load.spritesheet('tongue_monster', 'assets/Enemies/monster_tongue.png', 64, 64); // 480 x 159
    }

    updateEnemy() {
        super.updateEnemy();

        if (this.health > 0 && !this.isHurt) {
            this.animations.play('flapping');
        }
    };


}
