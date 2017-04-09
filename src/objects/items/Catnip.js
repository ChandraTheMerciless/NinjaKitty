export class Catnip extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'ninja_kitty_sheet', 17);
        game.add.existing(this);
        game.physics.arcade.enable(this);

        this.height = 60;
        this.width = 60;
        this.body.setCircle(20);
        this.body.immovable = true;
    }

    touchItem(player, item) {
        player.getHigh();
        this.kill();
    }
}
