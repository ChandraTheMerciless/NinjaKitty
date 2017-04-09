export class Cloud extends Phaser.Sprite {
    constructor(game, x, y, owningGroup = null, index = 0) {
        super(game, x, y, 'cloud_sheet', index);

        if (!owningGroup) {
            game.add.existing(this);
        }
        else {
            owningGroup.add(this);
        }

        this.height = 98.7;
        this.width = 197.4;
    }

    static loadCloudImages(game) {
        game.load.spritesheet('cloud_sheet', 'assets/Background/cloud_spritesheet.png', 282, 141);
    }
}
