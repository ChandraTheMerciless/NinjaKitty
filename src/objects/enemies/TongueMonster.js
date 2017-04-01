import Enemy from './Enemy.js';

export default class TongueMonster extends Enemy {
    constructor(game, x, y) {
        super(game, x, y, 'tongue_monster');

        this.height = 128;
        this.width = 128;
        //this.body.setSize(this.body.width - 40, this.body.height, 20, 0);


        // NOTE - sprite is 64 by 64
        this.animations.add('flapping', [0, 1, 2, 3, 4], 10, true);
        this.animations.add('attacking', [8, 9, 10, 11, 12], 10, true);
        this.animations.add('exploding', [16, 17, 18, 19, 20, 21, 22, 23], 10, false);

        // this.animations.add('roll', [0, 1], 10, true);
        // this.animations.play('roll');

        this.touchDamage = 5;
        this.speedX = 75;
        this.direction = -1;
        this.body.velocity.x = -this.speedX;
    };

    static loadTongueMonsterImage(game) {
        game.load.spritesheet('tongue_monster', 'assets/Enemies/monster_tongue.png', 122, 139); // 480 x 159
    }


}
