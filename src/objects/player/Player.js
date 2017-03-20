export default class Player extends Phaser.Sprite {
    constructor(game, x, y, lives = 5) {
        super(game, x, y, 'cat_fighter_redsash');

        game.physics.arcade.enable(this);
        // this.body.gravity.y = 900;
        // this.anchor.setTo(.5, .5);
        // this.height = 64;
        // this.width = 48;
        // this.body.setSize(this.body.width - 30, this.body.height - 70, 15, 70);

        // NOTE: figure out which images map to walking and standing cats
        this.animations.add('stand', [0, 20, 0, 21], 10, true);
        // this.animations.add('walk', [2, 3], 10, true);
        this.animations.add('dance', [1, 2], 8, true);

        this.leftDir = this.scale.x * -1;
        this.rightDir = this.scale.x;

        this.lives = lives;
    };

    static loadPlayerImage(game) {
        game.load.spritesheet('cat_fighter_redsash', 'assets/Player/cat_fighter_redsash.png', 50, 50);
    };

    isMoving() {
        return this.body.deltaX() !== 0;
    };

    getDeltaMovement() {
        return this.body.deltaX();
    };

    getVelocity() {
        return this.body.velocity.x;
    };

    updatePlayer(cursors, contacts, delta) {


        this._handleInput(cursors, contacts, delta);
    };

    goLeft(velocity = -150) {
        this.body.velocity.x = velocity;
        if (!this.jumping) {
            this.animations.play('walk');
        }
        this.scale.x = this.leftDir;
    };

    goRight(velocity = 150) {
        this.body.velocity.x = velocity;
        if (!this.jumping) {
            this.animations.play('walk');
        }
        this.scale.x = this.rightDir;
    };

    stopMoving(delta, slowRate = 500) {
        if (this.body.velocity.x !== 0) {
            let dir = this.body.velocity.x > 0 ? -1 : 1;
            let decrementAmount = delta * slowRate * dir;
            let newX = this.body.velocity.x + decrementAmount;

            if ((dir === -1 && newX <= 2) ||
                (dir === 1 && newX >= -2)) {
                //  Stand still
                this.animations.play('stand');
                this.body.velocity.x = 0;
            } else {
                this.body.velocity.x += decrementAmount;
            }
        } else {
            //  Stand still
            this.animations.play('stand');
            this.body.velocity.x = 0;
        }
    };

    _handleInput(cursors, contacts, delta) {
        if (this.body.touching.down && this.jumping) {
            this.jumping = false;
            this.animations.play('stand');
        } else {
            if (cursors.left.isDown) {
                this.goLeft();
            } else if (cursors.right.isDown) {
                this.goRight();
            } else if (!this.jumping) {
                this.stopMoving(delta);
            }
        }

        if (cursors.up.isDown && this.body.touching.down && contacts) {
            this.jump();
        }

        if (this.body.touching.right || this.body.touching.left) {
            this.body.velocity.x = 0;
        }
    };
}
