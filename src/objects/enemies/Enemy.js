export default class Enemy extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        game.add.existing(this);
        // Default physics options for Enemy
        game.physics.arcade.enable(this);

        this.anchor.setTo(.5, .5);

        this.normalAnimation = null;
        this.normalTint = this.tint;

        this.touchDamage = 0;
        this.doesDamage = true;
        this.didDamage = false;
        this.idleFrames = 0;

        this.isHurt = false;
        this.hurtFrames = 0;
        this.hurtVelocity = 0;
    }

    updateEnemy() {
        if (this.didDamage) {
            this.idle();
        }
        if (this.isHurt && this.health > 0) {
            if (this.hurtFrames < 60) {
                this.hurtFrames++;
                this.knockback(this.hurtVelocity);
            } else {
                this.isHurt = false;
                this.normalAnimation.play(10);
                this.tint = this.normalTint;
            }
        } else {
            this.facePlayer();
        }
    }

    facePlayer() {
        // this.direction *= -1;
        // this.body.velocity.x = this.direction * this.moveSpeed;
        const velocity = this.body.velocity.x;

        if(velocity < 0){
            this.scale.x = -2;
        } else {
            this.scale.x = 2;
        }
    }

    idleAfterAttack() {
        this.didDamage = true;
        this.idleFrames = 0;
        this.body.velocity.x = 0;
    }

    idle() {
        if (this.idleFrames < 90) {
            this.idleFrames++;
        } else {
            this.didDamage = false;
        }
    }

    canBeHurt() {
        return !this.isHurt;
    }

    hurtEnemy(player) {
        this.isHurt = true;
        this.tint = 0xff0000;
        this.animations.stop();
        this.health = this.health - player.attackDamage;
        if (this.health <= 0) {
            this.playDead();
        } else {
            this.hurtFrames = 0;

            let direction = this.body.x - player.body.x; // negative is left
            this.hurtVelocity = 75 * (direction / Math.abs(direction));
            this.knockback(this.hurtVelocity);
            this.normalAnimation = this.animations.currentAnim;
        }
    }

    knockback(velocity) {
        this.body.velocity.x = velocity;
    }

    playDead() {
        this.body.velocity.x = 0;
        this.animations.play("death", 10, false, true);
    }

}
