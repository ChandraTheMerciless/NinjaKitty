import Enemy from './Enemy.js';

export default class Pony extends Enemy {
    constructor(game, x, y) {
        super(game, x, y, 'pony');

        this.height = 128;
        this.width = 128;

        this.body.setSize(this.body.width - 35, this.body.height, 20, 15);
        this.body.collideWorldBounds = true;

        this.body.gravity.y = 400;

        // NOTE - sprite is 64 by 64
        this.animations.add('standing', [33], 10, true);
        this.animations.add('galloping', [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], 10, true);
        // this.animations.add('attacking', [8, 9, 10, 11, 12], 9, true);
        // this.animations.add('exploding', [16, 17, 18, 19, 20, 21, 22, 23], 10, false);


        this.touchDamage = 5;
        // this.speedX = 75;
        // this.direction = -1;
        this.moveSpeed = 75;
        // this.body.velocity.x = this.direction * this.moveSpeed;
        this.scale.x *= -1;
    };

    static loadPonyImage(game) {
        game.load.spritesheet('pony', 'assets/Enemies/ponies_sprites.png', 64, 64); // 480 x 159
    }

    updateEnemy() {
        super.updateEnemy();

        this.animations.play('galloping');
    };




}
