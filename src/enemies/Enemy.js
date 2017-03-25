export default class Enemy extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        game.add.existing(this);
        // Default physics options for Enemy
        game.physics.arcade.enable(this);

        this.body.gravity.y = 900;
        this.anchor.setTo(.5, .5);

        this.touchDamage = 0;
        this.doesDamage = true;

        if (DebugService.isInDebugMode()) {
            this.debugGraphics = new DebugGraphicsObjectSquare(game);
        }
    }

    updateEnemy() {
        if (this.debugGraphics) {
            this.debugGraphics.render(this.body);
        }
    }
}
