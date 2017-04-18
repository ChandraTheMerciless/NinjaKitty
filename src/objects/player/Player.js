import HUD from '../hud/HUD.js';

export default class Player extends Phaser.Sprite {
    constructor(game, x, y, lives = 5) {
        super(game, x, y, 'cat_fighter_redsash');

        game.physics.arcade.enable(this);
        this.body.gravity.y = 400;
        this.anchor.setTo(.5, .5);
        this.height = 80;
        this.width = 80;
        this.body.setSize(this.body.width - 30, this.body.height - 20, 14, 10);
        this.body.collideWorldBounds = true;

        this.animations.add('stand', [0, 20, 0, 21], 10, true);
        this.animations.add('walk', [0, 3, 4, 3], 10, true);
        this.animations.add('jumpingStart', [0, 7], 10, true);
        this.animations.add('jumpingAirborne', [29, 30], 10, true);
        this.animations.add('jumpingEnd', [7, 6, 7, 6], 10, true);
        this.animations.add('lowKick', [0, 40, 41, 42, 40, 0], 10, false);
        this.animations.add('middleKick', [0, 40, 43, 44, 40, 0], 10, false);
        this.animations.add('highKick', [0, 40, 45, 46, 40, 0], 10, false);
        this.animations.add('upperCut', [0, 4, 55, 56, 57, 58, 59], 10, false);
        this.animations.add('kamehameha', [0, 10, 11, 12, 11, 12, 11, 12, 13, 14, 15, 14, 15, 14, 15, 14, 15, 14, 15, 14, 15], 10, false);
        this.animations.add('playDead', [0, 1, 2, 31, 32, 33, 32, 34, 35], 10, false);
        this.animations.add('dance', [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2], 8, false);

        this.leftDir = this.scale.x * -1;
        this.rightDir = this.scale.x;

        this.jumping = true;
        this.moveEnabled = true;
        this.attacking = false;
        this.isHigh = false;
        this.isHurt = false;
        this.health = 100;
        this.attackDamage = 5;

        this.hurtVelocity = 0;

        this.lives = lives;

        this.HUD = new HUD(game);
        this.HUD.updateHealth(this.health);
    }

    static loadPlayerImage(game) {
        game.load.spritesheet('cat_fighter_redsash', 'assets/Player/cat_fighter_redsash.png', 50, 50);
    }

    isMoving() {
        return this.body.deltaX() !== 0;
    }

    getDeltaMovement() {
        return this.body.deltaX();
    }

    getVelocity() {
        return this.body.velocity.x;
    }

    updatePlayer(cursors, attackKeys, contacts, delta) {
        if (this.isHurt) {
            this.knockback(this.hurtVelocity);
        }
        this._handleInput(cursors, attackKeys, contacts, delta);
    }

    jump(velocity = -500) {
        this.body.velocity.y = velocity;
        this.frame = this.jumpFrame;
        this.jumping = true;

        this.animations.play('jumpingAirborne');

        // this.jumpSound.play();
    }

    goLeft(velocity = -150) {
        this.body.velocity.x = velocity;
        if (!this.jumping) {
            this.animations.play('walk');
        }
        this.scale.x = this.leftDir;
    }

    goRight(velocity = 150) {
        this.body.velocity.x = velocity;
        if (!this.jumping) {
            this.animations.play('walk');
        }
        this.scale.x = this.rightDir;
    }

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
    }

    startAttacking(attack) {
        this.attacking = true;
        this.animations.play(attack);
        this.animations.currentAnim.onComplete.add(this.stopAttacking, this);
    }

    stopAttacking() {
        this.attacking = false;
    }

    stopBeingHigh() {
        this.isHigh = false;
        this.moveEnabled = true;
    }

    touchHurtPlayer(enemy) {
        enemy.idleAfterAttack();
        let direction = this.body.x - enemy.body.x; // negative is left
        this.hurtVelocity = 125 * (direction / Math.abs(direction));
        this.knockback(this.hurtVelocity);
        this._hurtPlayer(enemy.touchDamage);
    }

    knockback(velocity) {
        this.body.velocity.x = velocity;
    }

    getHigh() {
        this.isHigh = true;
        this.isHurt = false;
        this.body.velocity.x = 0;
        this.animations.play('dance');
        this.animations.currentAnim.onComplete.add(this.stopBeingHigh, this);
    }

    _updateHealth(changeInHealth) {
        this.health += changeInHealth;
        if (this.health <= 0) {
            this.health = 0;
        }
        this.health = this.health > 100 ? 100 : this.health;
        this.HUD.updateHealth(this.health);
    }

    canBeHurt() {
        return !this.isHurt;
    }

    _hurtPlayer(damage) {
        this.isHurt = true;
        this.isHigh = false;
        this.moveEnabled = false;

        this.animations.stop();
        this.animations.play("playDead");
        this.animations.currentAnim.onComplete.add(this.stopInvulnerability, this);

        this._updateHealth(-damage);
    };

    stopInvulnerability() {
        this.isHurt = false;
        this.moveEnabled = true;
    }

    _handleInput(cursors, attackKeys, contacts, delta) {
        if (this.moveEnabled && !this.attacking && !this.isHigh) {
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

            if (this.body.touching.down && cursors.up.isDown) {
                this.jump();
            }
        }

        if (this.body.touching.right || this.body.touching.left) {
            this.body.velocity.x = 0;
        }

        if (!this.attacking && !this.jumping && !this.isHigh) {
            if (attackKeys.keyA.isDown) {
                let lowKick = this.animations.play('lowKick');
                this.startAttacking(lowKick);
            } else if (attackKeys.keyS.isDown) {
                let middleKick = 'middleKick';
                this.startAttacking(middleKick);
            } else if (attackKeys.keyD.isDown) {
                let highKick = 'highKick';
                this.startAttacking(highKick);
            } else if (attackKeys.keyW.isDown) {
                let upperCut = 'upperCut';
                this.startAttacking(upperCut);
            } else if (attackKeys.keySpace.isDown) {
                let kamehameha = 'kamehameha';
                this.startAttacking(kamehameha);
            }
        }
    }
}
