export default class Catnip extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'ninja_kitty_sheet', 17);
        game.add.existing(this);
        game.physics.arcade.enable(this);

        this.height = 60;
        this.width = 60;
        this.body.setSize(this.body.width-15, this.body.height-15, 7.5, 15);
        this.body.immovable = true;
    }

    touchItem(player, item) {
        if (player.health > 0) {
            player.getHigh();
            this.kill();
        }
    }
}
