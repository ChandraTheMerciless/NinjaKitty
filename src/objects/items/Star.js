export default class Star extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'ninja_kitty_sheet', 106);
        game.add.existing(this);
        game.physics.arcade.enable(this);

        this.height = 100;
        this.width = 100;
        this.body.setSize(this.body.width-20, this.body.height-20, 10, 10);
        this.body.immovable = true;
    }

    touchItem(player, game) {
        if (player.health > 0) {
            player.finishLevel();
            this.kill();
        }
    }
}
