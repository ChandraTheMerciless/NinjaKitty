export const TreeTypes = {
    FULL_PINE: 643,
    TOP_HALF_PINE: 673
};

export class Tree extends Phaser.Sprite {
    constructor(game, x, y, type = TreeTypes.FULL_PINE, owningGroup = null) {
        super(game, x, y, 'ninja_kitty_sheet', type);

        if (!owningGroup) {
            game.add.existing(this);
        }
        else {
            owningGroup.add(this);
        }

        this.height = 250;
        this.width = 250;
    }
}