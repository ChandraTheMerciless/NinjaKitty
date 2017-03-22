export default class Player extends Phaser.Sprite {
    constructor(game, x, y, lives = 5) {
        super(game, x, y, 'cat_fighter_redsash');

        game.physics.arcade.enable(this);
        // this.body.gravity.y = 400;
        this.anchor.setTo(.5, .5);
        this.height = 80;
        this.width = 80;
        this.body.setSize(this.body.width - 30, this.body.height - 70, 15, 70);

        // NOTE: figure out which images map to walking and standing cats
        this.animations.add('stand', [0, 20, 0, 21], 10, true);
        this.animations.add('walk', [0, 3, 4, 3], 10, true);
        this.animations.add('jumpingStart', [0, 7], 10, true);
        this.animations.add('jumpingAirborne', [29, 30], 10, true);
        this.animations.add('jumpingEnd', [7, 6, 7, 6], 10, true);
        this.animations.add('lowKick', [0, 40, 41, 42, 40, 0], 10, false);
        this.animations.add('middleKick', [0, 40, 43, 44, 40, 0], 10, true);
        this.animations.add('highKick', [0, 40, 45, 46, 40, 0], 10, true);
        this.animations.add('playDead', [0, 1, 2, 31, 32, 33, 32, 34, 35], 10, true);
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

    updatePlayer(cursors, attackKeys, contacts, delta) {


        this._handleInput(cursors, attackKeys, contacts, delta);

    };

    jump(velocity = -500) {
        this.body.velocity.y = velocity;
        this.frame = this.jumpFrame;
        this.jumping = true;
        if(this.body.touching.down) {
          this.animations.play('jumpingStart');
        } else {
          this.animations.play('jumpingAirborne');
        }
        // this.jumpSound.play();
    }

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
                this.animations.play('walk');
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

    _handleInput(cursors, attackKeys, contacts, delta) {
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

        // if (cursors.up.isDown && this.body.touching.down && contacts) {
        if (cursors.up.isDown) {
            this.jump();
        }

        if (this.body.touching.right || this.body.touching.left) {
            this.body.velocity.x = 0;
        }

        if(attackKeys.keyA.isDown) {
          this.animations.play('lowKick');
        }
    };
}