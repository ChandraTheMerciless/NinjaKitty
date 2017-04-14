export default class Enemy extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        game.add.existing(this);
        // Default physics options for Enemy
        game.physics.arcade.enable(this);

        this.anchor.setTo(.5, .5);

        this.touchDamage = 0;
        this.doesDamage = true;
        this.didDamage = false;
        this.idleFrames = 0;
    }

    updateEnemy() {
        this.facePlayer();
        if (this.didDamage) {
            this.idle();
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
}
