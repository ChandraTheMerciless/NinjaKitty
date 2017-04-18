import Enemy from './Enemy.js';

export default class Skeleton extends Enemy {
    constructor(game, x, y) {
        super(game, x, y, 'skeleton_monster');

        this.height = 128;
        this.width = 128;
        this.body.gravity.y = 10000;

        this.body.setSize(this.body.width - 40, this.body.height - 20, 15, 18);
        this.body.collideWorldBounds = true;


        // NOTE - sprite is 64 by 64
        this.animations.add('lurking', [0, 1, 2, 3], 10, true);
        this.animations.add('trudging', [8, 9, 10, 11], 10, true);
        this.animations.add('death', [24, 25, 26, 27, 28, 29, 30], 10, false);

        this.touchDamage = 5;
        this.moveSpeed = 75;
        this.scale.x *= -1;

        this.health = 10;
    };

    static loadSkeletonImage(game) {
        game.load.spritesheet('skeleton_monster', 'assets/Enemies/monster_skeleton.png', 64, 64);
    }

    updateEnemy() {
        super.updateEnemy();

        if (this.health > 0 && !this.isHurt) {
          if (this.body.velocity.x != 0){
            this.animations.play('trudging');
          } else {
            this.animations.play('lurking');
          }
        }
    };


}
